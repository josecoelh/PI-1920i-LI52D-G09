const request = require('request');
const error =require('./Error');
var elastic = 'http://localhost:9200';

module.exports = function() {
    return {
        getGroup : getGroup,
        createGroup : createGroup,
        updateGroup : updateGroup,
        deleteGroup : deleteGroup,
        addGameToGroup : addGameToGroup,
        removeFromGroup : removeFromGroup,
        getGameListWithSpecifiedDuration : getGameListWithSpecifiedDuration
    }
};

function getGameListWithSpecifiedDuration(id, min, max , cb) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    request.get(options, (err, response, body) => {
        if (err) return cb(err);
        if (!body.found) cb({code: error.NOT_FOUND, message: " group not found"});
        var games = body._source.games;
        games = games.filter(game => game.max_playtime>min && game.max_playtime<max)
        games.sort( (gameA, gameB) => gameA.max_playtime - gameB.max_playtime)
        cb(null, games)
    })
}

function removeFromGroup(id, gameName, cb) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    request.get(options, (error, res, body) =>{
        if (error) return cb(err);
        if(!body.found) cb({code : error.NOT_FOUND, message : " group not found"});
        let games = body._source.games;
        if(!games.some(elem => elem.name == gameName )) cb({code : error.NOT_FOUND, message : " game not found"});
        games = games.filter(elem => elem.name != gameName);
        options.body = {
            name : body._source.name,
            description : body._source.description,
            games : games
        };
        request.put(options, (e, res, _body) =>{
            if (e) return cb(e);
            console.log(`Game ${gameName} removed from group ${id}`);
            cb(null, {status: 'Game removed from a group', uri: `/group/_doc/${options.id}`})
        })
    })
}

function addGameToGroup(id, game, cb) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    request.get(options, (err, response, body) => {
        if (err) return cb(err);
        if(!body.found) cb({code : error.NOT_FOUND, message : " group not found"});
        options.id = body._id;
        let games = body._source.games;
        if(games.some(elem => elem.name == game.name )) return cb(null, {status: 'Game associated with a group', uri: `/group/_doc/${options.id}`});
        games.push(game);
        options.body = {
            name : body._source.name,
            description : body._source.description,
            games : games
        };
        request.put(options, (e, res, _body) =>{
            if (e) return cb(e);
            console.log(`Game ${game.name} added to group ${id}`);
            cb(null, {status: 'Game associated with a group', uri: `/group/_doc/${options.id}`})
        })
    });
}

function getGroup(id, cb) {
    var options = {
        url : `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    request.get(options, (err, response, body) => {
        if(err) return cb(err);
        if(!body.found) cb({code : error.NOT_FOUND, message : " group not found"});
        console.log(`Group ${id} acquired`);
        var group = {
            index : body._index,
            name : body._source.name,
            description : body._source.description,
            id : id,
            games : body._source.games,
        };
        cb(null,group)
    })
}


function createGroup(group, cb) {
    let options = {
        url: `${elastic}/group/_doc/`,
        json: true,
        headers: {'Content-Type': 'application/json'},
        body: group
    };
    request.post(options, (err, response, body) => {
        if (err) return cb(err);
        console.log(`Group ${group.name} created`);
        cb(null, {status: 'Group created', uri: `/groups/group/_doc/${body._id}`})

    });
}

function updateGroup (id,newName,newDescription,cb) {
    let options = {
        url: `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    }
    request.get(options, (err, response, body) => {
        if(err) cb(err)
        if(body.found){
            options.id = body._id
            options.body = {name : newName,
            description : newDescription,
            games : body._source.games}
        }
        else cb(error(error.NOT_FOUND,"not found"))
        request.put(options, (e, res, _body) =>{
            if (e) return cb(e);
            console.log(`Group ${id} updated`)
            cb(null, {status: 'Group updated', uri: `/group/_doc/${options.body.name}`})

        })
    });

}

function deleteGroup (id, cb) {
    let options = {
        url: `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    }
    request.get(options, (err, response , body) =>{
        if(err) cb(err)
        cb(error(error.NOT_FOUND,"not found"))

        request.delete(options, (e, res, bod) =>{
            if (e) cb(e)
            console.log(`Group ${id} is no more`)
            cb(null, {
                status : "group deleted",
                uri : `${elastic}/group/_doc/${id}`,
            })
        })
    })
}





