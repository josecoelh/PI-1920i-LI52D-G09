const express = require('express')
const app = express();

module.exports = ()=> {
     app.start = (host, port) =>{
        app.listen(port, host);
    }
    return app;
}


