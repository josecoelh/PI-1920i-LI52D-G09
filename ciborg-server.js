const PORT = 8000;
const STORAGE_PORT = 9200;

let bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const app = express();
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const gameData = require('./board-games-data');
const groupData = require('./ciborg-db');
const initializePassport = require('./passport-config')
const service = require('./ciborg-service')(gameData, groupData);
const ciborgWebApi = require('./ciborg-web-api')(service);
const userDb = require('./users-db')

app.use(session({
    secret: "kgb",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

initializePassport(
    passport,
    username => userDb.getUserbyName(username),
    id => userDb.getUser(id))

groupData()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', verifyAuthenticated, express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}))
app.use(flash())


const server = http.createServer(app);

app.use('/login', verifyUnauthenticated, express.static(__dirname + '/app/htmlPages/login.html'));
app.use('/register',verifyUnauthenticated, express.static(__dirname + '/app/htmlPages/Register.html'));


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}))

app.post('/register', (req, res) => {
    userDb.createUser({
        id: Date.now().toString(),
        username: req.body.username,
        password: req.body.password
    })
    res.redirect('/login')
})
app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

app.get(`/ciborg/popular`, ciborgWebApi.getPopularGamesList);
app.get(`/ciborg/search/:name`, ciborgWebApi.getGameByName);
app.get('/ciborg/groups', ciborgWebApi.getAllGroups)
app.get(`/ciborg/group/:id/:min_dur/:max_dur`, ciborgWebApi.getGameListWithSpecifiedDuration);
app.get(`/ciborg/group/:id`, ciborgWebApi.getGroup)
app.post('/ciborg/group', ciborgWebApi.createGroup);
app.put(`/ciborg/group/:id`, ciborgWebApi.updateGroup);
app.put(`/ciborg/group/:id/game/:game_name`, ciborgWebApi.addGameToGroup);
app.delete(`/ciborg/group/:id`, ciborgWebApi.deleteGroup);
app.delete(`/ciborg/group/:id/game/:game_name`, ciborgWebApi.removeFromGroup)


server.on('request', handleRequest);

function handleRequest(req) {
    console.log(`Request received for ${req.url} with method ${req.method}`)
}

function verifyAuthenticated(req, rsp, next) {
    if (req.isAuthenticated() || req.path === '/login' || req.path === '/register')
        return next()
    rsp.status(403)
    rsp.redirect('/login')
}

function verifyUnauthenticated(req, rsp, next) {
    if (req.isAuthenticated() ) {
        rsp.status(403)
        rsp.redirect('/')
    }
    return next()

}

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))