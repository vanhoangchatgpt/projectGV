let delay = (res, req, next) => {
    setTimeout(() => {
        //const token = req.headers.authorization.split(' ')[1];
        //awconsole.log(`>>>check: ${token}`)
        next()
    }, 3000)

}

module.exports = delay;