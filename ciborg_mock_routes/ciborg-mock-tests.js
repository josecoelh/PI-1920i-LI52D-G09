'use strict'

let assert = require('assert')
let mockService = require('../ciborg_mock_routes/ciborg-mock-services')
let fs = require('fs-extra')



describe('Get Popular Games List', () => {
    var expected
    fs.readFile('/ciborg_mock_json_files/getPopularGames.json')
        .then(result => expected = JSON.parse(result))
    it('both lists should match', done => {
        mockService.getPopularGames()
            .then(actual => assert.deepEqual(actual,expected))
        done()
    })
})