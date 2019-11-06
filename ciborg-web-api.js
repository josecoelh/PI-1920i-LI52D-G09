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

function createGroupWithFavoriteGames(req, res) {
    services.createGroupWithFavoriteGames(req.body.name,req.body.description,(err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 201
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

function errorHandler(err, res) {
    res.statusCode = err.statusCode
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(err))
}







function updateGroup(req, res, args) {
    services.updateGroup(req, res, args)
}

function deleteGroup(req, res, args) {
    services.deleteGroup(req, res, args)
}

function addGameToGroup(req, res, args) {
    services.addGameToGroup(req, res, args)
}

function getGameListWithSpecifiedDuration(req, res, args) {
    services.getGameListWithSpecifiedDuration(req, res, args)
}


module.exports = function (service) {
    services = service
return {
    getPopularGamesList: getPopularGamesList,
    getGameByNameList: getGameByNameList,
    createGroupWithFavoriteGames: createGroupWithFavoriteGames,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup,
    addGameToGroup: addGameToGroup,
    getGameListWithSpecifiedDuration: getGameListWithSpecifiedDuration
}

}
