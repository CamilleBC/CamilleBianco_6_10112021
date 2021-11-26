//Importer le modèle user
const models = require('../models');
//Importer les fonctions de jwt
const jwtUtils = require('../utils/jwtUtils');

exports.createComment = (req, res, next) =>{
    //Chercher le userId
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwtUtils.decodedToken(token);
    const userId = decodedToken.userId;

    models.User.findOne({where : {id : userId}})
        .then(function(user){
            models.Comment.create ({
                userName : user.name,
                userId : user.id, 
                content : req.body.content,
                postId : req.body.postId
            })
                .then(function(){
                    res.status(200).json({message : 'Commentaire créé !'})
                })
                .catch(function(error){
                    res.status(400).json({error})
                })
        })
        .catch(function(error){
            res.status(400).json({error})
        })
};
exports.getAllComments =(req, res, next )=>{
    models.Comment.findAll()
    .then(function(comment){
        res.status(200).json({comment})
    })
    .catch(function(error){
        res.status(400).json({error})
    })
}