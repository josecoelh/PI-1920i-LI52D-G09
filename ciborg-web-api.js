'use strict'


var services;
const GAME = 0;
const NAME = 0;
const GROUP_ID = 0;
const GAME_NAME = 1;
const MIN = 1, MAX = 2;

function getPopularGamesList(req, res) {
    services.getPopularGameList((err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,200)
        }
    })
}

function getGameByName(req, res, args) {
    services.getGameByName(args[NAME], (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,200)
        }
    })
}

function getGroup(req, res, args) {
    services.getGroup(args[GROUP_ID], (err, resp) =>{
        if(err)
            errorHandler(err, res);
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

function updateGroup(req, res, args) {
    services.updateGroup(args[GROUP_ID], req.body.name, req.body.description,(err,resp) =>{
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,200)
        }

    })
}

function deleteGroup(req, res, args) {
    services.deleteGroup(args[GROUP_ID],(err,resp) =>{
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,200)
        }

    })
}

function addGameToGroup(req, res, args) {
    services.getGameByName(args[GAME_NAME],(err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            services.addGameToGroup(args[GROUP_ID],resp[GAME], (e, response) =>{
                if (e) errorHandler(e,res);
                else{
                    sucessHandler(res, response, 200)
                }
            })
        }
    })
}

function removeFromGroup(req, res, args) {
    services.removeFromGroup(args[GROUP_ID], args[GAME_NAME],(err,resp) =>{
        if (err) {
            errorHandler(err, res)
        } else {
            sucessHandler(res,resp,200)
        }

    })
}

function getGameListWithSpecifiedDuration(req, res, args) {
    services.getGameListWithSpecifiedDuration(args[GROUP_ID],args[MIN],args[MAX],(err,resp) =>{
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
    createGroup: createGroup,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup,
    removeFromGroup : removeFromGroup,
    addGameToGroup: addGameToGroup
    }
};
