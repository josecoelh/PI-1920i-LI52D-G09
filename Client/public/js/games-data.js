function BundlesApiUris() {
    const baseUri = "http://localhost:8000/"

    this.getPopularGamesApi = () => `${baseUri}ciborg/popular`;
    this.getGameByNameApi = (name) => `${baseUri}ciborg/search/${name}`
    this.getAllGroupsApi = () => `${baseUri}ciborg/groups`;
    this.getGroupApi = (id) => `${baseUri}ciborg/group/${id}`

}

const apiUris = new BundlesApiUris();

function getPopularGames() {
    return fetch(apiUris.getPopularGamesApi()).then(response => response.json()).then(gamesView)
}

function getGame(name) {
    return fetch(apiUris.getGameByNameApi(name)).then(response => response.json()).then(gameView)
}

function getAllGoups() {
    return fetch(apiUris.getAllGroupsApi()).then(response => response.json()).then(groupsView)
}

function getGroup(id) {
    return fetch(apiUris.getGroupApi(id)).then(response => response.json()).then(groupView)
}