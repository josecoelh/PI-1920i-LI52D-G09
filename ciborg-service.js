'use strict'


var gameDto = require('./entities/gameDto')
var ciborg_data = require('./board-games-data')

function CiborgService() { }

CiborgService.prototype.getPopularGames = function () {
    return ciborg_data.getPopularGames()
        .then(result => result.json())
        .then(popularGames => popularGames.games.map(game => new gameDto(game.id,game.name,game.year_published,game.min_age,game.description)))

}




ciborg_data.getPopularGames()
CiborgService.prototype.getGameByName = function (name) {
    return ciborg_data.getGameByName(name)
        .then(result => result.json())
        .then(singleGame => singleGame.games.map(game => new gameDto(game.id,game.name,game.year_published,game.min_age,game.description)))
        .catch(err => {
            return {statusCode: 404, body: 'You must insert a valid game name' }})
}

module.exports = new CiborgService()

