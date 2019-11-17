'use strict'


var services;

function getPopularGamesList(req, res) {
    services.getPopularGameList()
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function getGameByName(req, res) {
    services.getGameByName(req.params.name)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err=>errorHandler(err,res))
}

function getGroup(req, res) {
    services.getGroup(req.params.id)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function getAllGroups(req,res){
    services.getAllGroups()
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function createGroup(req, res) {
    services.createGroup(req.body.name,req.body.description)
        .then(resp => sucessHandler(res,resp,201))
        .catch(err => errorHandler(err,res))
}

function updateGroup(req, res) {
    services.updateGroup(req.params.id, req.body.name, req.body.description)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function deleteGroup(req, res) {
    services.deleteGroup(req.params.id)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function addGameToGroup(req, res) {
    services.getGameByName(req.params.game_name)
        .then(game => {
            return services.addGameToGroup(req.params.id,game)
                .then(resp => sucessHandler(res,resp,201))
        })
        .catch(err => errorHandler(err,res))

}

function removeFromGroup(req, res) {
    services.removeFromGroup(req.params.id, req.params.game_name)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function getGameListWithSpecifiedDuration(req, res ) {
    services.getGameListWithSpecifiedDuration(req.params.id,req.params.min_dur,req.params.max_dur)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function sucessHandler(res,resp, statusCode) {
    res.statusCode = statusCode;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(resp));
}

function errorHandler(err, res) {
    res.statusCode = err.code;
    res.setHeader('content-type', 'application/json');
    console.log(err.description);
    res.end(JSON.stringify(err))
}


module.exports = function (service) {
    services = service;
return {
    getPopularGamesList: getPopularGamesList,
    getGameByName: getGameByName,
    getGameListWithSpecifiedDuration: getGameListWithSpecifiedDuration,
    getGroup : getGroup,
    getAllGroups : getAllGroups,
    createGroup: createGroup,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup,
    removeFromGroup : removeFromGroup,
    addGameToGroup: addGameToGroup
    }
};
