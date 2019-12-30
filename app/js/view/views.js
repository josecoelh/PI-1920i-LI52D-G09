const templates = require('./templates')
const CLEAR = ""
module.exports = {
    homeView: homeView,
    gamesView: gamesView,
    gameView: gameView,
    groupsView: groupsView,
    groupView: groupView,
    groupsRefresh : groupsRefresh,
    groupRefresh : groupRefresh
}

function init(routeManager){
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
            clickCounters[counterName].clearHtml(routeManager)
            routeManager.changeRoute(CLEAR)
        }
    }
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
    init(routeManager)
}

function gamesView(routeManager,games) {
    init(routeManager)
    routeManager.setGameContent(templates.gamesTemplate(games))
}

function gameView(routeManager,game) {
    routeManager.setGamesHeader(CLEAR)
    routeManager.setGroupHeader(CLEAR)
    routeManager.setGroupContent(CLEAR)
    routeManager.setGameContent(templates.gameTemplate(game))
    document.querySelector("#goToHome").addEventListener("click",
        () => {
            routeManager.setGameContent(CLEAR)
            routeManager.changeRoute("home")})
}

function groupsView(routeManager, groups) {
    init(routeManager)
    console.log(groups)
    routeManager.setGroupContent(templates.groupsTemplate(groups))
    document.querySelectorAll("button.delete").forEach(button => button.addEventListener("click", deleteGroup))
    document.getElementById("createGroup").addEventListener("click", createGroup)

    function createGroup() {
        var name = document.getElementById("createdGroupName").value
        var desc = document.getElementById("createdGroupDesc").value
        routeManager.changeRoute(`createGroup/${name}/${desc}`)
    }
    function deleteGroup() {
        routeManager.changeRoute(`deleteGroup/${this.id}`)
    }

}

function groupView(routeManager,group) {
    console.log(group)
    routeManager.setGamesHeader(CLEAR)
    routeManager.setGroupHeader(CLEAR)
    routeManager.setGameContent(CLEAR)
    routeManager.setGroupContent(templates.groupTemplate(group))
    document.querySelector("#goToHome").addEventListener("click", () => {
        routeManager.setGroupContent(CLEAR)
        routeManager.changeRoute("home");
    })
    document.getElementById("delGame").addEventListener("click", del)
    document.getElementById("addGame").addEventListener("click", add)
    function add() {
        var name = document.getElementById("newGameName").value
        routeManager.changeRoute(`GameAdd/${group.id}/${name}`)
    }
    function del() {
        var name = document.getElementById("newGameName").value
        routeManager.changeRoute(`GameDel/${group.id}/${name}`)
    }
}


function groupsRefresh(routeManager) {
    setTimeout(()=>{
        routeManager.changeRoute('groups')
    },1000)
}
function groupRefresh(routeManager) {
    setTimeout(()=>{
        routeManager.changeRoute(`group/${routeManager.getRoutData()[0]}`)
    },1000)


}
