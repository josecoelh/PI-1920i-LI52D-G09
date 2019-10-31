'use strict'

var gameDto = require('../entities/gameDto')
var ciborgMock = require('../ciborg_mock_routes/ciborg-mock')

function RoutesMockService() { }

RoutesMockService.prototype.getPopularGames = function () {
    return ciborgMock.getPopularGames()
        .then(result => result.json())
        .then(popularGames => popularGames.games.map(game => new gameDto(game.id,game.name,game.year_published,game.min_age,game.description)))
}

module.exports = new RoutesMockService()

