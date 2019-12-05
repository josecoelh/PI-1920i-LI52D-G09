'use strict'

class gameDto {
    constructor(id, name, description, max_playtime, image_url) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.max_playtime = max_playtime;
        this.image_url = image_url;
    }
}

module.exports = gameDto;