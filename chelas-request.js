const request = require('request');

module.exports = {

    get: function (options) {
        return new Promise(((resolve, reject) => {
            request.get(options,(err,res,body)=>{
                if(err) reject(err)
                resolve(body)
            })
        }))
    },


    post: function (options) {
        return new Promise(((resolve, reject) => {
            request.post(options,(err,res,body)=>{
                if(err) reject(err)
                resolve(body)
            })
        }))
    },


    put: function (options) {
        return new Promise(((resolve, reject) => {
            request.put(options,(err,res,body)=>{
                if(err) reject(err)
                resolve(body)
            })
        }))
    },


    delete: function (options) {
        return new Promise(((resolve, reject) => {
            request.delete(options,(err,res,body)=>{
                if(err) reject(err)
                resolve(body)
            })
        }))
    }
}