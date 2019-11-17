const request = require('./chelas-request');
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



function getAllGroups() {
    var options = {
        url : `${elastic}/group/_search`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options).then(body => body.hits.hits)
}


function getGameListWithSpecifiedDuration(id, min, max) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options).then(body =>{
        if (!body.found) throw {code: error.NOT_FOUND, description: " group not found"};
        var games = body._source.games[0];
        games = games.filter(game => game.max_playtime>min && game.max_playtime<max);
        games.sort( (gameA, gameB) => gameA.max_playtime - gameB.max_playtime);
        return games
    })
}

function removeFromGroup(id, gameName) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options).then(body =>{
        if(!body.found) throw {code : error.NOT_FOUND, description : " group not found"};
        let games = body._source.games[0];
        if(!games.some(elem => elem.name == gameName )) throw {code : error.NOT_FOUND, description : " game not found"};
        games = games.filter(elem => elem.name != gameName);
        options.body = {
            name : body._source.name,
            description : body._source.description,
            games : games
        };
        return request.put(options).then(() => {return {status: 'Game removed from a group', uri: `/ciborg/group/${id}`}}  )
    });
}

function addGameToGroup(id, game) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options).then(body => {
        if(body.found){
            options.id = body._id;
            let games = body._source.games;
            if(games.some(elem => elem.name == game.name )) return {status: 'Game associated with a group', uri: `/ciborg/group/${options.id}`};
            games.push(game);
            options.body = {
                name : body._source.name,
                description : body._source.description,
                games : games
            };
            return request.put(options).then(()=> {return {status: 'Game associated with a group', uri: `/ciborg/group/${id}`} } )
        }
        else throw {code : 404, description : "Group doesnt exist"}
    })

}

function getGroup(id) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options)
        .then(body =>{
            if(!body.found) throw {code : error.NOT_FOUND, description : " group not found"};
            else {
                return {
                    index : body._index,
                    name : body._source.name,
                    description:body._source.description,
                    id:id,
                    games:body._source.games
                }
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
    return request.post(options).then(body =>{ return {status: 'Group created', uri: `/ciborg/group/${body._id}`}})
}

function updateGroup (id,newName,newDescription) {
    let options = {
        url: `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options)
        .then(body => {
            if(body.found){
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

function deleteGroup (id) {
    let options = {
        url: `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options).then(body => {
        if(body.found){
            return request.delete(options)
                .then(()=>{return{status : "group deleted", uri : `/ciborg/group/_doc/${id}`,}})
        }
        else throw {code : 404, description: "Group Not Found"}
    })
}







