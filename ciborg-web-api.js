'use strict'


const gameDto = require('./entities/gameDto')
const service = require('./ciborg-service')
const ciborgData = require('./board-games-data')


async function getPopularGamesList(req, res) {
        let data = await ciborgData.getPopularGames((err,resp) => {
            if (err) {
                res.statusCode = err.code
                res.end(err.message + '\n' + err.error)
            } else {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(resp))
            }
        })}





function getGameByName(req, res) {
    try {
        let data = CiborgService.getGameByName()
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify(data)) //converte valores em javascript para uma String JSON.
    } catch (e) {
        //errorHandler(e, res)
    }
}

function createGroupWithFavoriteGames(req, res) {

}

function updateGroup(req, res) {

}

function deleteGroup(req, res) {

}

function addGameToGroup(req, res) {

}

function getGameListWithSpecifiedDuration(req, res) {

}

function errorHandler(err, res) {
    res.statusCode = err.statusCode
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(err))
}

module.exports = {
    getPopularGamesList: getPopularGamesList,
    getGameByName: getGameByName,
    createGroupWithFavoriteGames: createGroupWithFavoriteGames,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup,
    addGameToGroup: addGameToGroup,
    getGameListWithSpecifiedDuration: getGameListWithSpecifiedDuration
}

