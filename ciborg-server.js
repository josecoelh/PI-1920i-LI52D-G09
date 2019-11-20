const PORT = 8000;
const STORAGE_PORT = 9200;

let bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const gameData = require('./board-games-data');
const groupData = require('./ciborg-db');
groupData()
const service = require('./ciborg-service')(gameData, groupData);
const ciborgWebApi = require('./ciborg-web-api')(service);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);


app.get(`/ciborg/popular`, ciborgWebApi.getPopularGamesList);
app.get(`/ciborg/search/:name`, ciborgWebApi.getGameByName);
app.get('/ciborg/groups',ciborgWebApi.getAllGroups)
app.get(`/ciborg/group/:id/:min_dur/:max_dur`, ciborgWebApi.getGameListWithSpecifiedDuration);
app.get(`/ciborg/group/:id`, ciborgWebApi.getGroup)
app.post('/ciborg/group', ciborgWebApi.createGroup);
app.put(`/ciborg/group/:id`, ciborgWebApi.updateGroup);
app.put(`/ciborg/group/:id/game/:game_name`, ciborgWebApi.addGameToGroup);
app.delete(`/ciborg/group/:id`, ciborgWebApi.deleteGroup);
app.delete(`/ciborg/group/:id/game/:game_name`, ciborgWebApi.removeFromGroup)


server.on('request', handleRequest);

function handleRequest(req, rsp) {
    console.log(`Request received for ${req.url} with method ${req.method}`)



}

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))