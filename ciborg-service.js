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
        getAllGroups : getAllGroups,
        addGameToGroup: addGameToGroup,
        removeFromGroup : removeFromGroup,
        getGameListWithSpecifiedDuration: getGameListWithSpecifiedDuration
    }
}

function getAllGroups(cb) {
    return group.getAllGroups()
}

function getPopularGameList() {
    return data.getPopularGames()
}

function getGameByName(name) {
    return  data.getGameByName(name)


}

function getGroup(id) {
    return group.getGroup(id)
}

function createGroup(name,description) {
    return group.createGroup({name,description, games : []})
}

function updateGroup(id ,newName,newDescription) {
    return group.updateGroup(id,newName,newDescription)
    }


function deleteGroup(id , cb) {
    return group.deleteGroup(id, cb)
}

function addGameToGroup(id, game) {
    return group.addGameToGroup(id,game)
}

function removeFromGroup(id, gameName) {
    return group.removeFromGroup(id, gameName.replace('%20', " "))
}

function getGameListWithSpecifiedDuration(id, min, max) {
    return group.getGameListWithSpecifiedDuration(id, min, max)
}






