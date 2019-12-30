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
    var user = req.session.passport.user
    services.getGroup(req.params.id, user)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function getAllGroups(req,res){
    var user = req.session.passport.user
    services.getAllGroups(user)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function createGroup(req, res) {
    var user = req.session.passport.user
    services.createGroup(req.body.name,req.body.description, user)
        .then(resp => sucessHandler(res,resp,201))
        .catch(err => errorHandler(err,res))
}

function updateGroup(req, res) {
    var user = req.session.passport.user
    services.updateGroup(req.params.id, req.body.name, req.body.description,user)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function deleteGroup(req, res) {
    var user = req.session.passport.user
    services.deleteGroup(req.params.id, user)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function addGameToGroup(req, res) {
    var user = req.session.passport.user
    services.getGameByName(req.params.game_name)
        .then(game => {
            return services.addGameToGroup(req.params.id,game, user)
                .then(resp => sucessHandler(res,resp,201))
        })
        .catch(err => errorHandler(err,res))

}

function removeFromGroup(req, res) {
    var user = req.session.passport.user
    services.removeFromGroup(req.params.id, req.params.game_name, user)
        .then(resp => sucessHandler(res,resp,200))
        .catch(err => errorHandler(err,res))
}

function getGameListWithSpecifiedDuration(req, res ) {
    var user = req.session.passport.user
    services.getGameListWithSpecifiedDuration(req.params.id,req.params.min_dur,req.params.max_dur, user)
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
