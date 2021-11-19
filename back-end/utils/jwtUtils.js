//Importe jwt
const jwt = require('jsonwebtoken')

module.exports = {
    tokenSecret : 'RANDOM_SECRET_TOKEN',
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
        }
}

