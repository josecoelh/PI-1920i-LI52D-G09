'use strict'


var gameDto = require('./entities/gameDto')
const ciborgData = require('./board-games-data')




async function getPopularGamesList(req,res) {
    await ciborgData.getPopularGames((err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

async function getGameByNameList(req, res, args) {
    await ciborgData.getGameByName(args[0], (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

async function createGroupWithFavoriteGames(req,res,args) {
    await ciborgData.createGroup(args, (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

async function updateGroup(req, res, args) {
    let data = await ciborgData.updateGroup(args, (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

async function deleteGroup(req, res, args) {
    let data = await ciborgData.deleteGroup(args[0], (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

async function addGameToGroup(req, res, args) {
    let data = await ciborgData.addGameToGroup(args[0], (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

async function getGameListWithSpecifiedDuration(req, res, args) {
    let data = await ciborgData.getGameListWithSpecifiedDuration(args[0], (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
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


module.exports = {
    GetPopularGameList : getPopularGamesList,
    getGameByNameList: getGameByNameList,
    createGroupWithFavoriteGames: createGroupWithFavoriteGames,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup,
    addGameToGroup: addGameToGroup,
    getGameListWithSpecifiedDuration: getGameListWithSpecifiedDuration
}

