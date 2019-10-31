'use strict'

const CiborgService = require('./ciborg-service')

    function getPopularGamesList(req, res) {
        try {
            let data =  CiborgService.getPopularGames()
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(data)) //converte valores em javascript para uma String JSON.
        } catch (e) {
            //errorHandler(e, res)
        }
}
module.exports= {
    getPopularGamesList : getPopularGamesList}

