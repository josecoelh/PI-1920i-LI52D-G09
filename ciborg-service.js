'use strict'


var gameDto = require('./entities/gameDto')
const ciborgData = require('./board-games-data')



function getPopularGamesList() {
    let data = ciborgData.getPopularGames((err,resp) =>{
        if(err) {
            res.statusCode = err.code
            res.end(err.message + '\n' + err.error)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(bundle))
        }
    })
     //   .then(res => res.json())
       // .then(games => games.games.map(game => new gameDto(game.id, game.name, game.year_published, game.min_age, game.description)))

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

