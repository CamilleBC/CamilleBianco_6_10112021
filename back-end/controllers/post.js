//Importer le modèle user
const models = require('../models');
//Importer les fonctions de jwt
const jwtUtils = require('../utils/jwtUtils');
//Importer filesysteme de node
const fs = require('fs');

exports.createPost = (req, res, next)=> {
    //Chercher le userId
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwtUtils.decodedToken(token);
    const userId = decodedToken.userId;

    models.Post.create({
        userId : userId,
        titre : req.body.titre,
        description : req.body.description,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
        .then(function(post){
            res.status(200).json({post})
        })
        .catch(function(error){
            res.status(400).json({error})
        })
}