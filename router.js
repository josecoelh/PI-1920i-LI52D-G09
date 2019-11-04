'use strict'
const parse = require('url').parse

let GET = {};
let PUT = {};
let POST = {};
let DELETE = {};


const NAME = 0;
const VALUE = 1;

let rout = function (req, rsp) {
    var url = req.url
    const obj = parse(req.url, true)
    var pathname = obj.pathname
    var query = obj.query
    var urlArray = pathname.split('/')
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

                if (urlArray[i].includes('=')) {
                    var iPosition = urlArray[i].split("=");
                    if (!(iPosition[NAME] == (templateUrl[i]))) {
                        isProp = false;
                        break;
                    }
                    pathArg[count++] = iPosition[VALUE].replace(" ", "%20")
                } else {
                    if (!(urlArray[i] == templateUrl[i])) {
                        isProp = false;
                    }
                }
            }
            if (isProp) {
                container[prop](req, rsp, query);
                return
            }
        }
    }

}

rout.get = (url, fun) => GET[url] = fun
rout.put = (url, fun) => PUT[url] = fun
rout.delete = (url, fun) => DELETE[url] = fun
rout.post = (url, fun) => POST[url] = fun

module.exports = rout


