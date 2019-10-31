'use strict'

const request = require('request');
const gameDto = require('../PI-1920i-LI52D-G09/entities/gameDto')

class BoardGameApi {
    getPopularGames() {
        let url = 'https://www.boardgameatlas.com/api/search?orderby=popularity&client_id=SB1VGnDv7M';
        return request(url, function (error, response, body) {
            if (error) return console.log(error);
            return body.toString()
        });
    }
}

module.exports = new BoardGameApi()