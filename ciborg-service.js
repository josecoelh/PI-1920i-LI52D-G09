'use strict'

var data;
var group;
const error =require('./Error')

module.exports = function (gameData, groupData) {
    group = groupData
    data = gameData
    return {
        getPopularGameList: getPopularGameList,
        getGameByNameList: getGameByNameList,
        createGroup: createGroup,
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
     if(!name) cb(error(error.ARGUMENT_ERROR,"name must not be null"))
    data.getGameByName(name,cb)
}

function createGroup(name,description,cb) {
    if(!name) cb(error(error.ARGUMENT_ERROR,"name must not be null"))
    group.createGroup({name,description, games : []}, cb)
}

function updateGroup(id ,newName,newDescription,cb) {
    if(!name) cb(error(error.ARGUMENT_ERROR,"bad input"))
    group.updateGroup(id,newName,newDescription,cb)
    }


function deleteGroup(id , cb) {
    if(!id) cb(error(error.ARGUMENT_ERROR,"id must not be null"))
    group.deleteGroup(id, cb)
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




