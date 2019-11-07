'use strict'

class gameDto{
    constructor(name,description,max_playtime){
        this.name = name;
        this.description = description;
        this.max_playtime = max_playtime;
    }
}

module.exports = gameDto;