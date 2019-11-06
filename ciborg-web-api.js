'use strict'


var services;

function getPopularGamesList(req, res) {
    services.getPopularGameList((err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

function getGameByNameList(req, res, args) {
    services.getGameByName(args[0], (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

function createGroup(req, res) {
    services.createGroup(req.body.name,req.body.description,(err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 201
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }


    })
}
function updateGroup(req, res, args) {
    services.updateGroup(args[0], req.body.name, req.body.description,(err,resp) =>{
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }

    })
}





function deleteGroup(req, res, args) {
    services.deleteGroup(args[0],(err,resp) =>{
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }

    })
}

function addGameToGroup(req, res, args) {
    services.addGameToGroup(req, res, args)
}

function getGameListWithSpecifiedDuration(req, res, args) {
    services.getGameListWithSpecifiedDuration(req, res, args)
}


function errorHandler(err, res) {
    res.statusCode = err.code
    res.setHeader('content-type', 'application/json')
    console.log(err.message)
    res.end(JSON.stringify(err))
}


module.exports = function (service) {
    services = service
return {
    getPopularGamesList: getPopularGamesList,
    getGameByNameList: getGameByNameList,
    createGroup: createGroup,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup,
    addGameToGroup: addGameToGroup,
    getGameListWithSpecifiedDuration: getGameListWithSpecifiedDuration
}

}
