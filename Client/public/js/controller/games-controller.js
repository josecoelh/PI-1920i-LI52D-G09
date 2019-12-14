const data = require('../model/games-data')

module.exports = {
    nop : async function (){

    },
    getPopular: async function () {
        data.getPopularGames()
    },
    getGames: async function (name) {
        data.getGame(name)
    },
    getAllGroups: async function () {
        data.getAllGroups()
    },
    getGroup: async function (id) {
        data.getGroup(id)
    }
}