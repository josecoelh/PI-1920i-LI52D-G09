'use strict'

const request = require('request');
const gameDto = require('../PI-1920i-LI52D-G09/entities/gameDto')


    function getPopularGames(onSuccess,onError) {
        let url = 'https://ww.boardgameatlas.com/api/search?orderby=popularity&client_id=SB1VGnDv7M';
        request(url, function (err, response, body) {
            if (err) onError();
            else{
            let jsonObj = JSON.parse(body);
            var gameArr = {};
            var count = 0;
            jsonObj.games.map(game => gameArr[count++] = new gameDto(game.id, game.name, game.year_published, game.min_age, game.description));
            onSuccess(gameArr);}
        })
}
module.exports={
    getPopularGames : getPopularGames
}


