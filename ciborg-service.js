'use strict'


var gameDto = require('./entities/gameDto')
const ciborgData = require('./board-games-data')



function getPopularGamesList(req, rsp) {
    ciborgData.getPopularGames(onSuccess,onError);

    function onSuccess(gameArr) {
        rsp.statusCode = 200
        rsp.setHeader('content-type','application/json')
        rsp.end(JSON.stringify(gameArr))
    }
    function onError() {
        rsp.statusCode= 500
        rsp.end()
    }
}


module.exports = {
    GetPopularGameList : getPopularGamesList
}

