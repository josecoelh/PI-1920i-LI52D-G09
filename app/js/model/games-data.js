function BundlesApiUris() {
    const baseUri = "http://localhost:8000/"

    this.getPopularGamesApi = () => `${baseUri}ciborg/popular`;
    this.getGameByNameApi = (name) => `${baseUri}ciborg/search/${name}`
    this.getAllGroupsApi = () => `${baseUri}ciborg/groups`;
    this.getGroupApi = (id) => `${baseUri}ciborg/group/${id}`
    this.postGroup = () => `${baseUri}ciborg/group`
    this.GroupGames = (id,name) => `/ciborg/group/${id}/game/${name}`
}

const apiUris = new BundlesApiUris();
module.exports = {
    getPopularGames: () => {
        return fetch(apiUris.getPopularGamesApi()).then(response => response.json())
    },

    getGame: (name) => {
        return fetch(apiUris.getGameByNameApi(name)).then(response => response.json())
    },

    getAllGroups: () => {
        return fetch(apiUris.getAllGroupsApi()).then(response => response.json())
    },
    getGroup: (id) => {
        return fetch(apiUris.getGroupApi(id)).then(response => response.json())
    },
    deleteGroup: (id) => {
        return fetch(apiUris.getGroupApi(id), {method: "DELETE"}).then(response => response.json())
    },
    postGroup: (name, desc) => {
        return fetch(apiUris.postGroup(),
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name, description: desc})
            }
        ).then(response => response.json())
    },
    addGame: (id,name) => {
        return fetch(apiUris.GroupGames(id,name), {method: "PUT"}).then(response => response.json())
    },
    delGame: (id,name) => {
        console.log(name)
        return fetch(apiUris.GroupGames(id,name), {method: "DELETE"}).then(response => {
            const resp = response.json()

            return resp
        })
    }

}