//Importe jwt
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    tokenSecret : process.env.tokenSecret,
        generateToken : function(user) {
            return jwt.sign(
                {userId : user.id},
                this.tokenSecret,
                {expiresIn : '24h'}
            )
        },

        decodedToken : function(token){
            return jwt.verify(
                token, 
                this.tokenSecret)
        },
}

