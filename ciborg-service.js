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

function getAllGroups(user) {
    return group.getAllGroups(user)
}

function getPopularGameList() {
    return data.getPopularGames()
}

function getGameByName(name) {
    if(!name) throw {status : error.ARGUMENT_ERROR, description :"name must not be null"}
    return  data.getGameByName(name)


}

function getGroup(id, user) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    return group.getGroup(id,user)
}

function createGroup(name,description,user) {
    if(!name) throw {status : error.ARGUMENT_ERROR, description :"name must not be null"}
    return group.createGroup({user,name,description, games : []})
}

function updateGroup(id ,newName,newDescription,user) {
    if(!name) throw {status : error.ARGUMENT_ERROR, description :"name must not be null"}
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    return group.updateGroup(id,newName,newDescription,user)
    }


function deleteGroup(id,user) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    return group.deleteGroup(id,user)
}

function addGameToGroup(id, game,user) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    return group.addGameToGroup(id,game,user)
}

function removeFromGroup(id, gameName,user) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    if(!gameName) throw {status : error.ARGUMENT_ERROR, description :"name must not be null"}

    return group.removeFromGroup(id, gameName.replace('%20', " "),user)
}

function getGameListWithSpecifiedDuration(id, min, max,user) {
    if(!id) throw {status : error.ARGUMENT_ERROR, description :"id must not be null"}
    if(!min || !max || min>max) throw {status : error.ARGUMENT_ERROR, description :"min\max parameters are invalid"}
    return group.getGameListWithSpecifiedDuration(id, min, max,user)
}






