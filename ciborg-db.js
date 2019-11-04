const request = require('request');
const url = 'http://localhost:9200/ciborg/groups/group';


function ciborgdb() {
}

function checkError(statusCode, cb, err, res, body) {
    if (err) {
        cb(err)
        return true
    }
    if (res.statusCode != statusCode) {
        cb({
            code: res.statusCode,
            message: res.statusMessage,
            error: body
        })
        return true
    }
    return false
}


ciborgdb.prototype.createGroup = function (args, cb) {
    let options = {
        url: url,
        json: true,
        headers: {'Content-Type': 'application/json'},
        body: {'name': args.name, 'description': args.description, 'games': []}
    }
        request.post(options, (err, response, body) => {
                if (!checkError(201, cb, err, response, body)) {
                    let res = {id : body._id, x : options}
                    cb(null, body)
                }
            }
        )
}

ciborgdb.prototype.updateGroup = function (args, cb) {
    let options = {
        url: url,
        json: true,
        headers: {'Content-Type': 'application/json'},
    }
    request.post(options, (err, response, body) => {
        if (!checkError(201, cb, err, response, body)) {
            let res = {id : body._id,group: options}
            cb(null, res)
        }

});
}

ciborgdb.prototype.deleteGroup = function (args, cb) {
    let options = {
        url: url,
        json: true,
        headers: {'Content-Type': 'application/json'},
    }
    try {
        request.delete(options, (err, response, body) => {
                var res = {}
                res.statusCode = response.status
                if (err) {
                    res.body = 'You must insert a valid group id'
                } else {
                    res.body = 'Group deleted successfully'
                    res.group = options
                }
                cb(err, body)
            }
        )
    } catch (e) {

    }
}

ciborgdb.prototype.addGameToGroup = function (args, cb) {

}


function checkError(statusCode, cb, err, res, body) {
    if (err) {
        cb(err)
        return true
    }
    if (res.statusCode != statusCode) {
        cb({
            code: res.statusCode,
            message: res.statusMessage,
            error: body
        })
        return true
    }
    return false
}

module.exports = new ciborgdb()

