const data = require('../model/games-data')

module.exports = {
    nop : async function (){
        return  {
            bigodes: "https://handlebarsjs.com/images/handlebars_logo.png"
        }
    },
     createGroup : async function(name,desc){
        return await data.postGroup(name,desc)
     }
    ,
    deleteGroup : async function(id){
      return await data.deleteGroup(id)
    },
    getPopular: async function () {
        return await data.getPopularGames()
    },
    getGames: async function (name) {
       return await data.getGame(name)
    },
    getAllGroups: async function () {
        return await data.getAllGroups()
    },
    getGroup: async function (id) {
        return await data.getGroup(id)
    },
    addGame: async function (id,name) {
        return await data.addGame(id,name)
    },
    delGame: async function (id,name) {
        return await data.delGame(id,name)
    }

}