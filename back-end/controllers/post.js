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
        userName : req.body.userName,
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
};

exports.modifyLike = (req, res, next)=>{
    //Chercher le userId
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwtUtils.decodedToken(token);
    const user = decodedToken.userId;
    console.log(user)

    //Reprendre le like
    const likeReq = req.body.like;
    //Reprendre l'id du post
    const id = req.params.id;

    //On cherche si l'utilisateur a déjà liker ou disliker le projet
    models.Post_like_by_user.findOne({ where: { postid : id, userId : user }})
        .then(function(searchUpdateLike){
             //Si l'utilisateur n'a pas encore été liké ou disliké le post
    if(searchUpdateLike === null){
            //Si le user like
            if(likeReq === 1){
                //Création du like
                    models.Post_like_by_user.create({
                        postId : id,
                        userId : user,
                        liked : true,
                        disliked : false
                    })
                        .then(function(like){
                            //Incrémentation du like dans le post
                            models.Post.increment('like', {where : {id : id}})
                                .then(function(){
                                    res.status(200).json({message : 'Like ajouté !'})
                                })
                                .catch(function(error){
                                    res.status(400).json({message : 'Erreur dans incrémentation'})
                                })
                        })
                        .catch(function(error){
                            res.status(400).json({message : 'erreur dans la création du like'})
                        })
                }
                //Si le user dislike
                if(likeReq === -1){
                    //Création du dislike
                    models.Post_like_by_user.create({
                        postId : id,
                        userId : user,
                        liked : false,
                        disliked : true
                    })
                        .then(function(){
                            //Incrémentation du dislike dans le post
                            models.Post.increment('dislike', {where : {id : id}})
                                .then(function(){
                                    res.status(200).json({message : 'Dislike ajouté !'})
                                })
                                .catch(function(error){
                                    res.status(400).json({message : 'erreur dans incrémentation dislike'})
                                })
                        })
                        .catch(function(error){
                            res.status(400).json({message : 'erreur dans la création dislike'})
                        })
                }
            }
            //Si l'utilisateur a déjà liké ou disliké le post
                else{
                    if (likeReq === 0){
                        //Chercher si c'est un like
                            if(searchUpdateLike.liked === true){
                                searchUpdateLike.destroy({where : {postId : id, userId : user}})
                                .then(function(){
                                    //
                                    models.Post.decrement('like', {where : {id : id}})
                                    .then(function(){
                                        res.status(200).json({message : 'Le like a été supprimé!'})
                                    })
                                    .catch(function(error){
                                        res.status(400).json({message : 'Erreur dans la décrémentation du like'})
                                    })
                                })
                                .catch(function(error){
                                    res.status.json({message : 'Erreur dans la suppression du like' })
                                })
                            }
                            else{
                                searchUpdateLike.destroy({where : {postId : id, userId : user}})
                                .then(function(){
                                    models.Post.decrement('dislike', {where : {id : id}})
                                    .then(function(){
                                        res.status(200).json({message : 'Le dislike a été supprimé!'})
                                    })
                                    .catch(function(error){
                                        res.status(400).json({message : 'erreur dans la décrémentation du dislike'})
                                    })
                                })
                                .catch(function(error){
                                    res.status.json({message : 'Erreur dans la suppression du dislike'})
                                })
                            }
                    }
        }
           
        })
        .catch(function(error){
            console.log(error)
            res.status(500).json({error})
        })
    
    
}