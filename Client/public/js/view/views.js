const templates = require('./templates')
const CLEAR = ""
module.exports = {
    homeView: homeView,
    gamesView: gamesView,
    gameView: gameView,
    groupsView: groupsView,
    groupView: groupView
}
let clickCounters =
    {
        popClick:
            {
                counter :(window.location.hash !== "popular") ? 1 : 2,
                clearHtml : (routeManager) => routeManager.setGameContent(CLEAR)
            },
        groupsClick:{
            counter: (window.location.hash !== "groups") ? 1 : 2,
            clearHtml : (routeManager) => routeManager.setGroupContent(CLEAR)
        }
    };
function homeView(routeManager) {
    routeManager.setGameContent(CLEAR)
    routeManager.setGroupContent(CLEAR)
    routeManager.setMainHeader(templates.headers.main)
    routeManager.setGamesHeader(templates.headers.games)
    routeManager.setGroupHeader(templates.headers.groups)

    document.querySelector("#popularButton").addEventListener("click",
        () => {
            processClick("popClick", "popular")
        });
    document.querySelector("#getGroupsButton").addEventListener("click",
        () => {
            processClick("groupsClick", "groups")
        });

    function processClick(counterName, hashUpdate) {
        if (clickCounters[counterName].counter === 1) {
            clickCounters[counterName].counter = 2
            routeManager.changeRoute(hashUpdate)
        } else {
            clickCounters[counterName].counter = 1
            clickCounters[counterName].clearHtml(routeManager);
        }
    }
}

function gamesView(games, routeManager) {
    routeManager.setGameContent(templates.gamesTemplate(games))
}

function gameView(game, routeManager) {
    routeManager.setMainHeader(CLEAR)
    routeManager.setGamesHeader(CLEAR)
    routeManager.setGroupHeader(CLEAR)
    routeManager.setGroupContent(CLEAR)
    routeManager.setGameContent(templates.gameTemplate(game))
    document.querySelector("#goToHome").addEventListener("click", routeManager.changeRoute("home"))
}

function groupsView(groups, routeManager) {
    routeManager.setGroupContent(templates.groupsTemplate(groups))
}

function groupView(group, routeManager) {
    routeManager.setMainHeader(CLEAR)
    routeManager.setGamesHeader(CLEAR)
    routeManager.setGroupHeader(CLEAR)
    routeManager.setGameContent(CLEAR)
    routeManager.setGroupContent(templates.groupTemplate(group))
    document.querySelector("#goToHome").addEventListener("click", routeManager.changeRoute("home"))
}

