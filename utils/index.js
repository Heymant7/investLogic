const crypto = require('crypto')

const func = (salt, password) => {
      
    const myHash = crypto.createHash('sha256');
    const myData = myHash.update(password + salt).digest('hex')
    
    return myData
}

module.exports = {func}