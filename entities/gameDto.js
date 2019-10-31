'use strict'

class gameDto{
    constructor(id,name,year_published,min_age,description){
            this.id = id
            this.name = name
            this.year_published = year_published
            this.min_age = min_age
            this.description = description
    }
}

module.exports = gameDto