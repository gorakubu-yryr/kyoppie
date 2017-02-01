var rulesAgreePeriod = new Date("2016-12-05T09:00:00Z")-0
module.exports = async function () {
    return rulesAgreePeriod < Date.now()
}
