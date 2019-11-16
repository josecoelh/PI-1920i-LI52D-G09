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
    services.getGroup(req.params.id, (err, resp) =>{
        if(err)
            errorHandler(err, res);
        else {
            sucessHandler(res,resp,200)
        }
    })
}

function getAllGroups(req,res){
    services.getAllGroups((err, resp) =>{
        if (err) errorHandler(err,res)
        else {
            sucessHandler(res,resp,200)
        }
    })
}

function createGroup(req, res) {
    services.createGroup(req.body.name,req.body.description,(err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,201)
        }


    })
}

function updateGroup(req, res) {
    services.updateGroup(req.params.id, req.body.name, req.body.description,(err,resp) =>{
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,200)
        }

    })
}

function deleteGroup(req, res) {
    services.deleteGroup(req.params.id,(err,resp) =>{
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,200)
        }

    })
}

function addGameToGroup(req, res) {
    services.getGameByName(req.params.game-name,(err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            services.addGameToGroup(req.params.id,req.params.game-name, (e, response) =>{
                if (e) errorHandler(e,res);
                else{
                    sucessHandler(res, response, 200)
                }
            })
        }
    })
}

function removeFromGroup(req, res) {
    services.removeFromGroup(req.params.id, req.params.game-name,(err,resp) =>{
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,200)
        }

    })
}

function getGameListWithSpecifiedDuration(req, res ) {
    services.getGameListWithSpecifiedDuration(req.params.id,req.params.min,req.params.min,(err,resp) =>{
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,200)
        }
    })
}

function sucessHandler(res,resp, statusCode) {
    res.statusCode = statusCode;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(resp));
}

function errorHandler(err, res) {
    res.statusCode = err.code;
    res.setHeader('content-type', 'application/json');
    console.log(err.message);
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
