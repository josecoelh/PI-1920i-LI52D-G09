'use strict'

var data;
var group;

module.exports = function (gameData, groupData) {
    group = groupData
    data = gameData
    return {
        getPopularGameList: getPopularGameList,
        getGameByNameList: getGameByNameList,
        createGroupWithFavoriteGames: createGroupWithFavoriteGames,
        updateGroup: updateGroup,
        deleteGroup: deleteGroup,
        addGameToGroup: addGameToGroup,
        getGameListWithSpecifiedDuration: getGameListWithSpecifiedDuration
    }
}

function getPopularGameList(cb) {
    data.getPopularGames(cb)
}

function getGameByNameList(name,cb) {
  //  if(!name) //TODO ERROR THROW
    data.getGameByName(name,cb)
}

function createGroupWithFavoriteGames(name,description,cb) {
    //  if(!name) //TODO ERROR THROW
    group.createGroup({name,description},cb)
}

function updateGroup({name,description},cb) {
    group.updateGroup(name,description,cb)
    }


function deleteGroup(req, res, args) {
    ciborgData.deleteGroup(args[0], (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

function addGameToGroup(req, res, args) {
    ciborgData.addGameToGroup(args[0], (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}

function getGameListWithSpecifiedDuration(req, res, args) {
    ciborgData.getGameListWithSpecifiedDuration(args[0], (err, resp) => {
        if (err) {
            errorHandler(err, res)
        } else {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(resp))
        }
    })
}


function errorHandler(err, res) {
    res.statusCode = err.statusCode
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(err))
}




