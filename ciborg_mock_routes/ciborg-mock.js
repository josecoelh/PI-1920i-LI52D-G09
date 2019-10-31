'use strict'

const fs = require('fs-extra')

function CiborgMock() {}

CiborgMock.prototype.getPopularGames = function(){
    return fs.readFile('./ciborg_mock_json_files/getPopularGames.json')
}

module.exports = new CiborgMock()