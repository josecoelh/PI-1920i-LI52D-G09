'use strict'

const request = require('./chelas-request');
const gameDto = require('./entities/gameDto')


function getPopularGames() {
    let url = 'https://www.boardgameatlas.com/api/search?orderby=popularity&client_id=SB1VGnDv7M';
    return request.get(url)
        .then(body => JSON.parse(body))
        .then(obj => obj.games.map(game => new gameDto(game.id,game.name, game.description ,game.max_playtime)))
}

function getGameByName(name, cb) {
    let url = `https://www.boardgameatlas.com/api/search?name=${name}&exact=true&client_id=SB1VGnDv7M`;
    return request.get(url)
        .then(body => JSON.parse(body))
        .then(obj => {
            if (obj.games.length === 0) throw {code : 404, description : "Game Not Found"};
            return obj.games.map(game => new gameDto(game.id,game.name, game.description ,game.max_playtime, game.image_url))})
}


module.exports = {
    getPopularGames: getPopularGames,
    getGameByName: getGameByName
}


