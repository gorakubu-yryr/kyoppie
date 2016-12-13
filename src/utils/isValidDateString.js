module.exports = function(datestring){
    var date = new Date(datestring)
    return !!date.getFullYear()
}