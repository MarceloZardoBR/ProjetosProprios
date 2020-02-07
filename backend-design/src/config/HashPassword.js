const bcrypt = require('bcrypt-nodejs');

const getHash = (password) =>{
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, function(err,hash){
            return hash;
        })
    })
}
    

const compareHash = (password, userPassword, callback) => {
    bcrypt.compare(password, userPassword, (err, isMatch) => {
        return isMatch;
    })
}

module.exports = {
    getHash, 
    compareHash
}