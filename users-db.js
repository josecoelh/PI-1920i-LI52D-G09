var elastic = 'http://localhost:9200';
const request = require('./chelas-request');

module.exports = {
    getUser : getUser,
    createUser : createUser,
    getUserbyName : getUserbyName
}

function getUser(id) {
    var options = {
        url: `${elastic}/users/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    };
    return request.get(options)
        .then(body => {
            if (!body.found) throw {code:404, description: " group not found"};
            else {
                return {
                    id: body._source.id,
                    username: body._source.username,
                    password: body._source.password
                };
            }
        })
}

function createUser(user) {
    let options = {
        url: `${elastic}/users/_doc/`,
        json: true,
        headers: {'Content-Type': 'application/json'},
        body : user
    };

    return request.post(options).then(
        () =>{
            return {status: 'User created'}})
}

function getUserbyName(username) {
        var options = {
            url : `${elastic}/users/_search`,
            json: true,
            headers: {'Content-Type': 'application/json'},
        };
        return request.get(options).then(body =>{
            var user = body.hits.hits.find(elem => elem._source.username === username)
            return user._source}
        )

}