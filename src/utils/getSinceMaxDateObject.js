module.exports = function(sinceDate,maxDate) {
    var obj = {$exists:true}
    if (sinceDate) obj.$gt = new Date(sinceDate)
    if (maxDate) obj.$lt = new Date(maxDate)
    return obj
}