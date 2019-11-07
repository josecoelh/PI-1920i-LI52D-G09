'use strict'

const request = require('request');
const gameDto = require('./entities/gameDto')
const assert = require('assert');


function getPopularGames(cb) {
    let url = 'https://www.boardgameatlas.com/api/search?orderby=popularity&client_id=SB1VGnDv7M';
    request.get(url, (err, response, body) => {
        assert.equals(err,null)

        requestHandler(200, cb, err, response, body)
    })
}

function getGameByName(name, cb) {
    let url = `https://www.boardgameatlas.com/api/search?name=${name}&exact=true&client_id=SB1VGnDv7M`;
    request.get(url, (err, response, body) => {
        assert.equals(err,null)
        requestHandler(200, cb, err, response, body)
    })
}

