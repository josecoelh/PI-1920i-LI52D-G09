'use-strict';

const fs = require('fs-extra');


module.exports =  {

    getPopularGames : function() {
        return fs.readFile('./mock-response/popular.json');
    },
    getGameByName : function() {
        return fs.readFile('./mock-response/searchSpiritIsland.json');
    },
    getAllGroups : function() {
        return fs.readFile('./mock-response/allGroups.json');
    },
    geGroup : function() {
        return fs.readFile('./mock-response/oneGroup.json');
    }

    }

