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

function getAllGroups() {
    return group.getAllGroups()
}

function getPopularGameList() {
    return data.getPopularGames()
}

function getGameByName(name) {
    if(!name) throw {status : error.ARGUMENT_ERROR, description :"name must not be null"}
    return  data.getGameByName(name)


}

function getGroup(id) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    return group.getGroup(id)
}

function createGroup(name,description) {
    if(!name) throw {status : error.ARGUMENT_ERROR, description :"name must not be null"}
    return group.createGroup({name,description, games : []})
}

function updateGroup(id ,newName,newDescription) {
    if(!name) throw {status : error.ARGUMENT_ERROR, description :"name must not be null"}
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    return group.updateGroup(id,newName,newDescription)
    }


function deleteGroup(id) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    return group.deleteGroup(id)
}

function addGameToGroup(id, game) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    return group.addGameToGroup(id,game)
}

function removeFromGroup(id, gameName) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    if(!name) throw {status : error.ARGUMENT_ERROR, description :"name must not be null"}

    return group.removeFromGroup(id, gameName.replace('%20', " "))
}

function getGameListWithSpecifiedDuration(id, min, max) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    if(!min || !max || min>max) throw {status : error.ARGUMENT_ERROR, description :"min\max parameters are invalid"}
    return group.getGameListWithSpecifiedDuration(id, min, max)
}






