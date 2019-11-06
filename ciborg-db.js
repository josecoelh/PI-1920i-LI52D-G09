const request = require('request');
const url = 'http://localhost:9200/groups/group';


function ciborgdb() {
}


ciborgdb.prototype.createGroup = function (group, cb) {
    let options = {
        url: url,
        json: true,
        headers: {'Content-Type': 'application/json'},
        id: null,
        body: {'name': group.name, 'description': group.description, 'games': []}
    }
    request.post(options, (err, response, body) => {
        options.id = body._id
        requestHandler(200, cb, err, response, body, "Group created", `/ciborg/api/group/${body._id}`)
    })
}


function requestHandler(statusCode, cb, err, res, body, status, uri) {
    if (err) {
        return cb(err)
    }
    if (res.statusCode != statusCode) {
        return cb({
            code: res.statusCode,
            message: res.statusMessage,
            error: body
        })
    }
    cb(null, {status: status, uri: uri})
}

ciborgdb.prototype.updateGroup = function (args, cb) {
    let options = {
        url: url,
        json: true,
        headers: {'Content-Type': 'application/json'},
    }
    request.post(options, (err, response, body) => {
            let res = {id: body._id, group: options}
            cb(null, res)
        });
}

ciborgdb.prototype.deleteGroup = function (group, cb) {
    let options = {
        url: url,
        json: true,
        headers: {'Content-Type': 'application/json'},
    }
    request.delete(options, (err, response, body) => {
        requestHandler(201, cb, err, response, body, "Group deleted", `/ciborg/api/group/${options.id}`)
    })
}


module.exports = new ciborgdb()

