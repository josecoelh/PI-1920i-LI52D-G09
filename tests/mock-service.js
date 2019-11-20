'use strict';

const mock = require('./CiborgMock');
const gameDto = require('../entities/gameDto');

module.exports = {
    getPopularGames: function () {
        return mock.getPopularGames()
            .then(buffer => JSON.parse(buffer.toString()))
            .then(jsonObj => jsonObj.games.map(game => new gameDto(game.name, game.description ,game.max_playtime)))
    },
    getGameByName: function () {
        return mock.getGameByName()
            .then(buffer => JSON.parse(buffer.toString()))
            .then(jsonObj => jsonObj.games.map(game => new gameDto(game.name, game.description ,game.max_playtime)))
    },
    getAllGroups: function () {
        return mock.getAllGroups()
            .then(buffer => JSON.parse(buffer.toString()))
    },
    getGroup: function () {
        return mock.geGroup()
            .then(buffer => JSON.parse(buffer.toString()))
    }
}

