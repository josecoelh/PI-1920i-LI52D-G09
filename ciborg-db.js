const request = require('request')
const url = "https://www.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=SB1VGnDv7M"


request(url, processResponse)
   
function processResponse(error, response, body){
    if(error) return console.log(error)
     console.log(`status code: ${response.statuscode}`)
    return console.log(`Response recieved ${body.toString()}`)
    }



