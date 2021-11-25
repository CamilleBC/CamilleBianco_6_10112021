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
};

exports.getAllPost = (req, res, next) => {
    models.Post.findAll()
        .then(function(post){
            res.status(200).json({post})
        })
        .catch(function(error){
            res.status(400).json({error})
        })
};

exports.getOnePost = (req, res, next)=>{
     models.Post.findOne({where : {id : req.params.id}})
        .then(function(post){
            res.status(200).json({post})
        })
        .catch(function(error){
            res.status(400).json({error})
        })
}

exports.modifyPost = (req, res, next) => {
    console.log(req.body)
    //Savoir si il y a une nouvelle image
    const postObject = req.file ?
    //Si nouvelleImage = true
    (
        //On retrouve l'ancienne image que l'on supprime
        models.Post.findOne({where : {id : req.params.id}})
            .then(function(post){
                const filename = post.imageUrl.split('/images/')[1]
                fs.unlinkSync(`images/${filename}`)
            })
            .catch(function(error){
                res.status(400).json({error})
            }),
        //On transorme sous forme d'objet notre requête et on reprends le nouvel URL de l'image
        {...req.body, 
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}
    ) : 
    //Si nouvelleImage = false
    (
        //On reprends simplement la requête tel quel
        {...req.body}
    );
    models.Post.update({...postObject}, {where :{id : req.params.id}})
    .then (function(){
        res.status(200).json({message : 'Post modifié.'})
    })
    .catch (function(error){
        res.status(400).json({error})
    })
};

exports.deletePost = (req, res, next )=>{
    models.Post.findOne({where : {id : req.params.id}})
        .then(function(post){
            //Récupérer le nom du fichier
            const filename = post.imageUrl.split('/images/')[1]
            //Supprimer un fichier et la sauce
            fs.unlink(`images/${filename}`, () =>{
                models.Post.destroy({where : {id : req.params.id}})
                    .then(function(){
                        res.status(200).json({message : 'Post supprimé !'})
                    })
                    .catch(function(error){
                        res.status(400).json({error})
                    })
            })
        })
        .catch(function(error){
            res.status(400).json({error})
        })
    
    
}