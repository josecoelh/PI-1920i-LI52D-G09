'use strict'

const request = require('request');
const gameDto = require('./entities/gameDto')


function getPopularGames(cb) {
    let url = 'https://www.boardgameatlas.com/api/search?orderby=popularity&client_id=SB1VGnDv7M';
    request.get(url, (err, response, body) => {
        requestHandler(200, cb, err, response, body)
    })
}

function getGameByName(name, cb) {
    let url = `https://www.boardgameatlas.com/api/search?name=${name}&exact=true&client_id=SB1VGnDv7M`;
    request.get(url, (err, response, body) => {
        requestHandler(200, cb, err, response, body)
    })
}



function requestHandler(statusCode, cb, err, res, body) {
    if (err) {
        return cb(err)
    }
    if (res.statusCode != statusCode) {
        return cb({
            code: res.statusCode,
            message: res.statusMessage,
            error: body
        })
    }
    let jsonObject = JSON.parse(body);
    let gameArray = {};
    let count = 0;
    jsonObject.games.map(game => gameArray[count++] = new gameDto(game.name, game.description ,game.max_playtime))
    return cb(null,gameArray);
}


module.exports = {
    getPopularGames: getPopularGames,
    getGameByName: getGameByName
}


