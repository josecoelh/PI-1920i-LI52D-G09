'use strict'
const parse = require('url').parse

let GET = {};
let PUT = {};
let POST = {};
let DELETE = {};
const NAME = 0;
const VALUE = 1;

function ret(req, rsp) {
    let data = ""
    req.on('data', chunk => data += chunk.toString())
    req.on('end', rout)

 function rout () {
    if(data!= "")req.body = JSON.parse(data);
    var urlArray = req.url.split('/');
    var container;
    switch (req.method) {
        case 'GET':
            container = GET;
            break;
        case 'PUT':
            container = PUT;
            break;
        case 'POST':
            container = POST;
            break;
        case 'DELETE':
            container = DELETE;
            break;
    }
    for (let prop in container) {
        var isProp = true;
        var templateUrl = (prop + "").split('/')
        if (templateUrl.length == urlArray.length) {
            var count = 0;
            var pathArg = {};
            for (let i = 0; i < urlArray.length; i++) {
                if (templateUrl[i].includes(':')) {
                    pathArg[count++] = urlArray[i].replace(" ", "%20")
                }
                else {
                    if (!(urlArray[i] == templateUrl[i])) {
                        isProp = false;
                    }
                }
            }
            if (isProp) {
                return container[prop](req, rsp, pathArg);

            }
        }
    }
    }
}
ret.get = (url, fun) => GET[url] = fun
ret.put = (url, fun) => PUT[url] = fun
ret.delete = (url, fun) => DELETE[url] = fun
ret.post = (url, fun) => POST[url] = fun

module.exports = ret


