
let routs ={
    "popular" : getPopularGames,
    "game" : getGame,
    "groups" : getAllGoups,
    "group" : getGroup
};



function rout(hash) {
    console.log(hash);
    const hashPath = hash.substring(1)
    let [state, ...args] = hashPath.split('/')
    state=== "" || routs[state].apply(null,args)
    defaultView()
}

