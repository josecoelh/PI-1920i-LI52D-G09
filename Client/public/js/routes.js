const controller = require('./controller/games-controller')
const views = require('./view/views')

module.exports = {
    home : {
        controller : controller.nop,
        view : views.homeView
    },
    popular: {
        controller: controller.getPopular,
        view: views.gamesView
    },
    game: {
        controller: controller.getGames,
        view: views.gameView
    },
    groups: {
        controller: controller.getAllGroups,
        view: views.groupsView
    },
    group: {
        controller: controller.getGroup,
        view: views.groupView
    }
}