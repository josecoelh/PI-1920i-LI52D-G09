function defaultView() {
    pageload();
}

function gamesView(games) {
    document.querySelector("#gamesResult").innerHTML = gamesListTemplate(games);
}

function gameView(game) {
    document.querySelector("#header").innerHTML = "";
    document.querySelector("#games").innerHTML = "";
    document.querySelector("#groups").innerHTML = "";
    document.querySelector("#groupsResult").innerHTML = "";
    document.querySelector("#gamesResult").innerHTML = gameTemplate(game);
    document.querySelector("#goToHome").addEventListener("click", processgoBackClick)
}

function groupsView(groups) {
    document.querySelector("#groupsResult").innerHTML = groupListTemplate(groups);
}

function groupView( group) {
    document.querySelector("#header").innerHTML = "";
    document.querySelector("#games").innerHTML = "";
    document.querySelector("#groups").innerHTML = "";
    document.querySelector("#gamesResult").innerHTML = "";
    document.querySelector("#groupsResult").innerHTML = groupTemplate(group);
    document.querySelector("#goToHome").addEventListener("click", processgoBackClick)
}

function processgoBackClick(){
    window.location.hash = "";
    processHashChange();
}