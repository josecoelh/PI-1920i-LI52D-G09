const request = require('request');
var url = 'http://localhost:9200';

module.exports = function() {
    return {
        createGroup:createGroup,
        updateGroup : updateGroup,
        deleteGroup : deleteGroup
    }
}


function createGroup(group, cb) {
    var status = "Group created"
    let options = {
        url: url + `/groups/_doc/${group.name}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
        body: {'name': group.name, 'description': group.description, 'games': []}
    };
    var exists = false
    request.get(options,(err, response , body) =>{
        if(body._id){
            cb(null, {status: status, uri: `/ciborg/group/${group.name}`})
        } else {
            request.post(options, (err, response, body) => {
                requestHandler( cb, err, body, status ,group.name)
            })
        }
    });
}


function requestHandler( cb, err, body, status, name) {
    if (err) return cb(err);
    if(body.result == 'created')
        cb(null, {status: status, uri: `/ciborg/group/${name}`})

}

function updateGroup (args, cb) {
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

function deleteGroup (group, cb) {
    let options = {
        url: url,
        json: true,
        headers: {'Content-Type': 'application/json'},
    }
    request.delete(options, (err, response, body) => {
        requestHandler(201, cb, err, response, body, "Group deleted", `/ciborg/api/group/${options.id}`)
    })
}




