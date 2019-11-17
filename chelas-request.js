const request = require('request');

var exp = function (options, cb) {
    request(options,cb);
};

exp.head = function(options){
    return new Promise(((resolve, reject) => {
        request.head(options,(err, res, body)=>{
            if (err) reject(err);
            resolve(body)
        })
    }))
};

exp.get = function (options) {
    return new Promise(((resolve, reject) => {
        request.get(options,(err,res,body)=>{
            if(err) reject(err);
            resolve(body)
        })
    }))
};


exp.post = function (options) {
    return new Promise(((resolve, reject) => {
        request.post(options,(err,res,body)=>{
            if(err) reject(err);
            resolve(body)
        })
    }))
};


exp.put = function (options) {
    return new Promise(((resolve, reject) => {
        request.put(options,(err,res,body)=>{
            if(err) reject(err);
            resolve(body)
        })
    }))
};


exp.delete = function (options) {
    return new Promise(((resolve, reject) => {
        request.delete(options,(err,res,body)=>{
            if(err) reject(err);
            resolve(body)
        })
    }))
};

module.exports = exp;
