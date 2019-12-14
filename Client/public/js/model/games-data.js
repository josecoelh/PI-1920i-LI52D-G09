function BundlesApiUris() {
    const baseUri = "http://localhost:8000/"

    this.getPopularGamesApi = () => `${baseUri}ciborg/popular`;
    this.getGameByNameApi = (name) => `${baseUri}ciborg/search/${name}`
    this.getAllGroupsApi = () => `${baseUri}ciborg/groups`;
    this.getGroupApi = (id) => `${baseUri}ciborg/group/${id}`

}

const apiUris = new BundlesApiUris();
module.exports = {
    getPopularGames: () => {
        return fetch(apiUris.getPopularGamesApi()).then(response => response.json()).then(gamesView)
    },

    getGame: (name) => {
        return fetch(apiUris.getGameByNameApi(name)).then(response => response.json()).then(gameView)
    },

    getAllGroups: () => {
        return fetch(apiUris.getAllGroupsApi()).then(response => response.json()).then(groupsView)
    },
    getGroup: (id) => {
        return fetch(apiUris.getGroupApi(id)).then(response => response.json()).then(groupView)
    }

}