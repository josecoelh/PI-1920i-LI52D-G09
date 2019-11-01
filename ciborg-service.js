'use strict'


var gameDto = require('./entities/gameDto')
const ciborgData = require('./board-games-data')



function getPopularGamesList() {
    return ciborgData()
        .then(res => res.json())
        .then(games => games.games.map(game => new gameDto(game.id, game.name, game.year_published, game.min_age, game.description)))

}

/*CiborgService.prototype.getGameByName = function (name) {
    return ciborg_data.getGameByName(name)
        .then(result => result.json())
        .then(singleGame => singleGame.games.map(game => new gameDto(game.id,game.name,game.year_published,game.min_age,game.description)))
        .catch(err => {
            return {statusCode: 404, body: 'You must insert a valid game name' }})
}*/

module.exports = {
    GetPopularGameList : getPopularGamesList
}

