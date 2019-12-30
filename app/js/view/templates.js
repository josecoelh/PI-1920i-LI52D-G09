const Handlebars = require('../../node_modules/handlebars/dist/handlebars')

module.exports = {
    headers: {
        main: `<h1>Chelas Internet BOarRd Games </h1>`,
        games: `<button id ="popularButton">Popular games</button>`,
        groups : `<button id ="getGroupsButton">Groups</button>`
    },
    gamesTemplate: Handlebars.compile(require('./templates/gameList.hbs').default),
    gameTemplate: Handlebars.compile(require('./templates/singleGame.hbs').default),
    groupTemplate: Handlebars.compile(require('./templates/singleGroup.hbs').default),
    groupsTemplate: Handlebars.compile(require('./templates/groupList.hbs').default)
}