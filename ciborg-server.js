const PORT = 8000

const http = require('http')
const router = require('./router')
const ciborgWebApi = require('./ciborg-web-api')

const server = http.createServer(router)

router.get(`/ciborg/popular`, ciborgWebApi.getPopularGamesList)
router.get(`ciborg/search/:name`, ciborgWebApi.getGameByName)
router.post('ciborg/group', ciborgWebApi.createGroupWithFavoriteGames)
router.put(`ciborg/group/:id`, ciborgWebApi.updateGroup)
router.delete(`ciborg/group/:id`, ciborgWebApi.deleteGroup)
router.put(`ciborg/group/:id/:game-id`, ciborgWebApi.addGameToGroup)
router.get(`ciborg/group/:id/:min-dur/:max-dur`, ciborgWebApi.getGameListWithSpecifiedDuration)

server.on('request', handleRequest)

function handleRequest(req, rsp) {
    console.log(`Request received for ${req.url} with method ${req.method}`)
    let data = ""
    req.on('data', chunk => data += chunk.toString())
    req.on('end', processBodyAndReply)


    function processBodyAndReply() {
        console.log(`Received data: ${data}`)
    }
}

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))