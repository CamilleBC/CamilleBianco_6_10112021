const validator = require('password-validator');

//Permets d'imposer un schéma plus sécurisé
const passwordSchema = new validator();

//Les paramètres obligatoires du mdp
passwordSchema
.is().min(8)                                    //Est d'une longueur minimum de 8
.has().digits()                                 //A des chiffres
.has().symbols()                                //A un caractère spéciale
.has().uppercase()                              //A des majuscules
.has().lowercase()                              //A des minuscules
.has().not().spaces()                           //N'a pas d'espaces


module.exports = (req, res, next) =>{
    if(passwordSchema.validate(req.body.password) === false){
        res.writeHead(404, 
            {message : 'Le mot de passe doit contenir : 8 caractères sans espaces avec au minimum 1 majuscule, 1 minuscule, 1 symboles.'}, )
        res.end('Format de mot de passe incorrecte');
    }
    else {
        next();
    }
};