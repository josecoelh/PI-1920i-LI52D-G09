var code;
var message;



function Error(coce , message) {
    this.code = code;
    this.message = message;
}

module.exports = {
     Error : Error,
     ARGUMENT_ERROR : 400,
     NOT_FOUND : 404
}