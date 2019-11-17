const request = require('./chelas-request');
const error =require('./Error');
var elastic = 'http://localhost:9200';

module.exports = function() {
    return {
        getAllGroups : getAllGroups,
        getGroup : getGroup,
        createGroup : createGroup,
        updateGroup : updateGroup,
        deleteGroup : deleteGroup,
        addGameToGroup : addGameToGroup,
        removeFromGroup : removeFromGroup,
        getGameListWithSpecifiedDuration : getGameListWithSpecifiedDuration
    }
};


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
        if (!body.found) return {code: error.NOT_FOUND, message: " group not found"};
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
        if(!body.found) return {code : error.NOT_FOUND, message : " group not found"};
        let games = body._source.games[0];
        if(!games.some(elem => elem.name == gameName )) return {code : error.NOT_FOUND, message : " game not found"};
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
            if(!body.found) return {code : error.NOT_FOUND, message : " group not found"};
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
    })
}





