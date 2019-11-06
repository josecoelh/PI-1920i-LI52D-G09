'use strict'

const request = require('request');
const gameDto = require('../PI-1920i-LI52D-G09/entities/gameDto')
const ciborgDb = require('./ciborg-db')


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


function updateGroup(args, cb) {
    ciborgDb.updateGroup(args, cb);
}

function addGameToGroup(args, cb) {
    ciborgDb.addGameToGroup(args, cb);
}


function deleteGroup(args, cb) {
    ciborgDb.deleteGroup(args, cb);
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
    jsonObject.games.map(game => gameArray[count++] = new gameDto(game.id, game.name, game.year_published, game.min_age, game.description))
    return cb(null,gameArray);
}


module.exports = {
    getPopularGames: getPopularGames,
    getGameByName: getGameByName,
}


