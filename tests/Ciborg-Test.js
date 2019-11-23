'use strict'

const mockService = require('./mock-service');
const gameData = require('../board-games-data');
const groupData = require('../ciborg-db');
const service = require('../ciborg-service')(gameData, groupData);
const expect = require('chai').expect;
let fs = require('fs-extra')

describe('Get Popular Games', () => {
    let expected = service.getPopularGameList()
    it('Should return popular games', done => {
        mockService.getPopularGames()
            .then(actual => expect(actual).to.deep.equals(actual,expected)).catch(err => console.log(err)).
        finally(done());
    })
});

describe('Get Spirit Island', () => {
    let expected = service.getGameByName("Spirit20%Island");
    it('Should return Spirit Island', done => {
        mockService.getGameByName()
            .then(actual => expect(actual).to.deep.equals(actual,expected)).catch(err => console.log(err)).
        finally(done());
    })
});

describe('Get all Groups', () => {
    let expected = service.getAllGroups()
    it('Should show all the groups', done => {
        mockService.getAllGroups()
            .then(actual => expect(actual).to.deep.equals(actual,expected)).catch(err => console.log(err)).
        finally(done());

    })
});
describe('Get a Group', () => {
    let expected = fs.readFile('./mock-response/oneGroup.json')
        .then(buffer => JSON.parse(buffer.toString())).catch(err => console.log(err));
    it('Should show all the groups', done => {
        mockService.getGroup()
            .then(actual => expect(actual).to.deep.equals(actual,expected)).catch(err => console.log(err)).
        finally(done());
    })
});