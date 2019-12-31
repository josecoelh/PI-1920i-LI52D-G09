const request = require('./chelas-request');
const groupDto = require('./entities/groupDto')
const error =require('./Error');
var elastic = 'http://localhost:9200';

let ret = function() {
    const url = `${elastic}/group`;
    return request.head(url)
            .catch(()=>{request.put(url)})
};

ret.getAllGroups = getAllGroups;
ret.getGroup = getGroup;
ret.createGroup = createGroup;
ret.updateGroup = updateGroup;
ret.deleteGroup = deleteGroup;
ret.addGameToGroup= addGameToGroup;
ret.removeFromGroup = removeFromGroup;
ret.getGameListWithSpecifiedDuration = getGameListWithSpecifiedDuration;

module.exports = ret;



function getAllGroups(user) {
    var options = {
        url : `${elastic}/group/_search`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options).then(body =>{
        var groups = body.hits.hits.filter(elem => user === elem._source.user)
        return groups.map( group => new groupDto(group._id,group._source.name, group._source.description, group._source.games))
        }
    )
}


function getGameListWithSpecifiedDuration(id, min, max,user) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options).then(body =>{
        if (!body.found) throw {code: error.NOT_FOUND, description: " group not found"};
        if(body._source.user!== user) throw  {code : 404 , description : "access forbidden"}
        var games = body._source.games[0];
        games = games.filter(game => game.max_playtime>min && game.max_playtime<max);
        games.sort( (gameA, gameB) => gameA.max_playtime - gameB.max_playtime);
        return games
    })
}

function removeFromGroup(id, gameName,user) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    let optionMerge = {
        json : true,
        headers: {'Content-Type': 'application/json'},
        url : 'http://localhost:9200/group/_forcemerge',
    }
    return request.get(options).then(body =>{
        if(!body.found) throw {code : error.NOT_FOUND, description : " group not found"};
        if(body._source.user!== user) throw  {code : 404 , description : "access forbidden"}
        let games = body._source.games;
        if(!games.some(elem => elem.name == gameName )) throw {code : error.NOT_FOUND, description : " game not found"};
        games = games.filter(elem => elem.name != gameName);
        options.body = {
            name : body._source.name,
            description : body._source.description,
            games : games
        };
        return request.put(options).then(() => {
            return {status: 'Game removed from a group', uri: `/ciborg/group/${id}`}}  )
    }).then(request.post(optionMerge));
}

function addGameToGroup(id, game,user){
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    let optionMerge = {
        json : true,
        headers: {'Content-Type': 'application/json'},
        url : 'http://localhost:9200/group/_forcemerge',
    }
    return request.get(options).then(body => {
        if(body.found){
            if(body._source.user!== user) throw  {code : 404 , description : "access forbidden"}
            options.id = body._id;
            let games = body._source.games;
            if(games.some(elem => elem.name === game[0].name )) return {status: 'Game associated with a group', uri: `/ciborg/group/${options.id}`};
            games.push(game[0]);
            options.body = {
                user : user,
                name : body._source.name,
                description : body._source.description,
                games : games
            };
            return request.put(options).then(()=> {return {status: 'Game associated with a group', uri: `/ciborg/group/${id}`} } )
        }
        else throw {code : 404, description : "Group doesnt exist"}
    }).then(request.post(optionMerge))

}

function getGroup(id,user) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options)
        .then(body =>{
            if(!body.found) throw {code : error.NOT_FOUND, description : " group not found"};
            else {
                if(body._source.user!== user) throw  {code : 404 , description : "access forbidden"}
                return  new groupDto(body._id,body._source.name, body._source.description, body._source.games);
            }
        })
}

function createGroup(group) {
    let options = {
        url: `${elastic}/group/_doc/`,
        json: true,
        headers: {'Content-Type': 'application/json'},
        body: group
    };
    return request.post(options).then(
        res =>{
            return {status: 'Group created', uri: `/ciborg/group/${res._id}`}})
}

function updateGroup (id,newName,newDescription,user) {
    let options = {
        url: `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options)
        .then(body => {
            if(body.found){
                if(body._source.user!== user) throw  {code : 404 , description : "access forbidden"}
                options.id = body._id;
                options.body =
                    {
                        name : newName,
                        description : newDescription,
                        games : body._source.games
                    };
                return request.put(options).then(() =>{return {status: 'Group updated', uri: `/ciborg/group/${id}`}})
            }
            else throw {code : 404, description: "Group not found."}
        })


}

function deleteGroup (id,user) {
    let options = {
        url: `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    let optionMerge = {
        json : true,
            headers: {'Content-Type': 'application/json'},
        url : 'http://localhost:9200/group/_forcemerge',
    }
    return request.get(options).then(body => {
        if(body.found){
            if(body._source.user!== user) throw  {code : 404 , description : "access forbidden"}
            return request.delete(options)
                .then(()=>{return{status : "group deleted", uri : `/ciborg/group/_doc/${id}`,}}).then(request.post(optionMerge))
        }
        else throw {code : 404, description: "Group Not Found"}
    })
}







