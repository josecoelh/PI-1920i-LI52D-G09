const PORT = 8000
const STORAGE_PORT = 9200

const http = require('http')
const router = require('./router')
const gameData = require('./board-games-data')
const groupData = require('./ciborg-db')
const service = require('./ciborg-service')(gameData, groupData)
const ciborgWebApi = require('./ciborg-web-api')(service)


const server = http.createServer(router)

router.get(`/ciborg/popular`, ciborgWebApi.getPopularGamesList)
router.get(`/ciborg/search/:name`, ciborgWebApi.getGameByNameList)
router.post('/ciborg/group', ciborgWebApi.createGroupWithFavoriteGames)
router.put(`/ciborg/group/:id`, ciborgWebApi.updateGroup)
router.delete(`/ciborg/group/:id`, ciborgWebApi.deleteGroup)
router.put(`/ciborg/group/:id/:game-id`, ciborgWebApi.addGameToGroup)
router.get(`/ciborg/group/:id/:min-dur/:max-dur`, ciborgWebApi.getGameListWithSpecifiedDuration)

server.on('request', handleRequest)

function handleRequest(req, rsp) {
    console.log(`Request received for ${req.url} with method ${req.method}`)



}

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))