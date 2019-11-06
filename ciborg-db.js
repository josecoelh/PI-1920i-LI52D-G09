const request = require('request');
const error =require('./Error')
var elastic = 'http://localhost:9200';

module.exports = function() {
    return {
        createGroup:createGroup,
        updateGroup : updateGroup,
        deleteGroup : deleteGroup
    }
}




function createGroup(group, cb) {
    let options = {
        url: `${elastic}/group/_doc/${group.name}`,
        id : group.name,
        json: true,
        headers: {'Content-Type': 'application/json'},
        body: group
    };
    request.post(options, (err, response, body) => {
        if (err) return cb(err);
        console.log(`Group ${group.name} created`)
        cb(null, {status: 'Group created', uri: `/groups/group/_doc/${group.name}`})

    });
}


function updateGroup (id,newName,newDescription,cb) {
    let options = {
        url: `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    }
    request.get(options, (err, response, body) => {
        if(err) cb(err)
        if(body.found){
            options.id = body._id
            options.body = {name : newName,
            description : newDescription,
            games : body._source.games}
            request.put(options, (e, res, _body) =>{
                if (e) return cb(e);
                console.log(`Group ${id} updated`)
                cb(null, {status: 'Group updated', uri: `/group/_doc/${options.body.name}`})

            })
        }
        else cb(error(error.NOT_FOUND,"not found"))
        });

}

function deleteGroup (id, cb) {
    let options = {
        url: `${elastic}/group/_doc/${id}`,
        json: true,
        headers: {'Content-Type': 'application/json'},
    }
    request.get(options, (err, response , body) =>{
        if(err) cb(err)
        cb(error(error.NOT_FOUND,"not found"))

        request.delete(options, (e, res, bod) =>{
            if (e) cb(e)
            console.log(`Group ${id} is no more`)
            cb(null, {
                status : "group deleted",
                uri : `${elastic}/group/_doc/${id}`,
            })
        })
    })
}



