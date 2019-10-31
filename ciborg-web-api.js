'use strict'

const ciborgData = require('./board-games-data')
const gameDto = require('./entities/gameDto')

function fillGameDtoWithInfo(data) {
    return ((data => data.json())
            .then(games => games.games.map(game => new gameDto(game.id, game.name, game.year_published, game.min_age, game.description)))
            .catch(err => {
                return {statusCode: 404, body: err.toString()}
            })
    )
}

function getPopularGamesList(req, res) {
    try {
        let x = ciborgData.getPopularGames();
        let data = fillGameDtoWithInfo(x);
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify(data)) //converte valores em javascript para uma String JSON.
    } catch (e) {
        //errorHandler(e, res)
    }
}

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

