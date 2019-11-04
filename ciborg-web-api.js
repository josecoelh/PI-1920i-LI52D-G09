'use strict'


const services = require('./ciborg-service')
const urlParse = require('url').parse


 function getPopularGamesList(req, res) {
    services.GetPopularGameList(req,res)
}

function getGameByNameList(req, res, args) {
    services.getGameByNameList(req,res,args)
}

function createGroupWithFavoriteGames(req,res,args) {
   services.createGroupWithFavoriteGames(req,res,args)
}

function updateGroup(req, res, args) {
    services.updateGroup(req,res,args)
}

function deleteGroup(req, res, args) {
    services.deleteGroup(req,res,args)
}

async function addGameToGroup(req, res, args) {
   services.addGameToGroup(req,res,args)
}

async function getGameListWithSpecifiedDuration(req, res, args) {
  services.getGameListWithSpecifiedDuration(req,res,args)
}



module.exports = {
    getPopularGamesList: getPopularGamesList,
    getGameByNameList: getGameByNameList,
    createGroupWithFavoriteGames: createGroupWithFavoriteGames,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup,
    addGameToGroup: addGameToGroup,
    getGameListWithSpecifiedDuration: getGameListWithSpecifiedDuration
}

