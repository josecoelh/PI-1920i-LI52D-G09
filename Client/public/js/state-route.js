const routes = require('./routes')

window.addEventListener("load", () => {
    window.addEventListener("hashchange", processHashChange)
    let header = document.querySelector("#header");
    let gamesHeader = document.querySelector("#gamesHeader");
    let gameResult = document.querySelector("#gamesResult");
    let groupsHeader = document.querySelector("#groupsHeader");
    let groupsResult = document.querySelector("#groupsResult");
    let routData = null;

    const routeManager = {
        setMainHeader: (html) => {
            header.innerHTML = html
        },
        setGamesHeader: (html) => {
            gamesHeader.innerHTML = html
        },
        setGroupHeader: (html) => {
            groupsHeader.innerHTML = html
        },
        setGameContent: (html) => {
            gameResult.innerHTML = html
        },
        setGroupContent: (html) => {
            groupsResult.innerHTML = html
        },
        changeRoute: (hash, data) => {
            data ? routData = data : routData
            window.location.hash = hash
        }
    }

    function resetRouteData() {
        routeData = null;
    }

    function addRouteData(args) {
        routData = args;
    }

    processHashChange()

    function processHashChange() {
        const DEFAULT_STATE = "home"

        const hash = window.location.hash.substring(1)
        let [state, ...args] = hash.split('/')

        let route = routes[state];

        if (!route) {
            window.location.hash = DEFAULT_STATE;
            return;
        }
        addRouteData(args)
        route
            .controller.apply(null, args)
            .then(data => route.view(routData, routeManager))
    }
})