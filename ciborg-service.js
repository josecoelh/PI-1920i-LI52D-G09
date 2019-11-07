'use strict'

var data;
var group;
const error =require('./Error');

module.exports = function (gameData, groupData) {
    group = groupData
    data = gameData
    return {
        getPopularGameList: getPopularGameList,
        getGameByName: getGameByName,
        getGroup : getGroup,
        createGroup: createGroup,
        updateGroup: updateGroup,
        deleteGroup: deleteGroup,
        addGameToGroup: addGameToGroup,
        removeFromGroup : removeFromGroup,
        getGameListWithSpecifiedDuration: getGameListWithSpecifiedDuration
    }
}

function getPopularGameList(cb) {
    data.getPopularGames(cb)
}

function getGameByName(name,cb) {
    if(!name) cb({status : error.ARGUMENT_ERROR, description :"name must not be null"})
    data.getGameByName(name,cb)
}

function getGroup(id, cb) {
    if(!id) cb({status : error.ARGUMENT_ERROR, description :"id must not be null"})
    group.getGroup(id,cb)
}

function createGroup(name,description,cb) {
    if(!name) cb({status : error.ARGUMENT_ERROR, description :"name must not be null"})
    group.createGroup({name,description, games : []}, cb)
}

function updateGroup(id ,newName,newDescription,cb) {
    if(!id || newName || newDescription) cb({status : error.ARGUMENT_ERROR, description :"bad input"})
    group.updateGroup(id,newName,newDescription,cb)
    }


function deleteGroup(id , cb) {
    if(!id) cb({status : error.ARGUMENT_ERROR, description :"id must not be null"})
    group.deleteGroup(id, cb)
}

function addGameToGroup(id, game, cb) {
    if(!id) cb({status : error.ARGUMENT_ERROR, description :"id must not be null"})
    group.addGameToGroup(id,game,cb)
}

function removeFromGroup(id, gameName, cb) {
    if(!id || gameName) cb({status : error.ARGUMENT_ERROR, description :"bad input"})
    group.removeFromGroup(id, gameName.replace('%20', " "), cb)
}

function getGameListWithSpecifiedDuration(id, min, max , cb) {
    if(min  > max) cb({status : error.ARGUMENT_ERROR, description :"min must be smaller than max"});
    if(!id) cb({status : error.ARGUMENT_ERROR, description :"id must not be null"})
    group.getGameListWithSpecifiedDuration(id, min, max , cb)
}






