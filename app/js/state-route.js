const routes = require('./routes')

window.addEventListener("load", () => {
    processHashChange()
    window.addEventListener("hashchange", processHashChange)
    let header = document.querySelector("#header");
    let gamesHeader = document.querySelector("#gamesHeader");
    let gameResult = document.querySelector("#gamesResult");
    let groupsHeader = document.querySelector("#groupsHeader");
    let groupsResult = document.querySelector("#groupsResult");
    var routData = null;

    const routeManager = {
        getRoutData : () => {return routData},

        setMainHeader: (html) => {
            header.innerHTML = html
        },
        setGamesHeader: (html) => {
            if(gamesHeader) gamesHeader.innerHTML = html
        },
        setGroupHeader: (html) => {
            if(groupsHeader) groupsHeader.innerHTML = html
        },
        setGameContent: (html) => {
            if(gameResult)gameResult.innerHTML = html
        },
        setGroupContent: (html) => {
            if(groupsResult)groupsResult.innerHTML = html
        },
        changeRoute: (hash, data) => {
            routData = (data ? data : routData)
            window.location.hash = hash
        }
    }

    function resetRouteData() {
        routeData = null;
    }

    function addRouteData(args) {
        routData = args;
    }


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
            .then(data => {
                return route.view(routeManager, data);
            })
    }
})