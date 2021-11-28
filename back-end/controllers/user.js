//Importer le modèle user
const models = require('../models');
//Importer le package de cryptage bcrypt
const bcrypt = require('bcrypt');
//Importer le package de créateur et vérificateur de token jsonwebtoken
const jwt = require('jsonwebtoken');
//Importer les fonctions de jwt
const jwtUtils = require('../utils/jwtUtils');

//Créer et exporter la fonction signup
exports.signup = (req, res, next)=>{
    //Hasher le mdp
    bcrypt.hash(req.body.password, 10)
        //Résolution de la promesse avec retour du mdp hasher
        .then(function(hash){
            //Création du nouvel utilisateur
            models.User.create({
                name : req.body.name,
                email : req.body.email, 
                password : hash,
            })
                .then (function(user){
                    res.status(200).json({message : user.id})
                })
                .catch(function(error){
                    res.status(400).json({error})
                })
        })
        //Si erreur lors du hashage
        .catch(function(error){
            res.status(500).json({error})
        })
}; 

exports.login = (req, res, next)=>{
    //Trouver l'utilisateur
    models.User.findOne({where :{ 
        email: req.body.email
    }})
        .then(function(user){
            //Si l'utilisateur n'a pas été trouvé
            if(!user){
                return res.status(401).json({message: 'Utilisateur non trouvé.'})
                
            }
            //Comparer le mdp avec celui dans le BDD
            bcrypt.compare(req.body.password, user.password)
                .then(function(valid){
                    //Si le mdp n'est pas valide
                    if(!valid){
                        res.status(400).json({message: 'Mot de passe incorrecte.'})
                    }
                    //Si le mdp est valide
                    res.status(200).json({
                        userId : user.id,
                        token : jwtUtils.generateToken(user),
                        name : user.name,
                        isAdmin : user.isAdmin
                    })
                })
                .catch(function(error){
                    res.status(500).json({error})
                })
        })
        .catch(function(error){
            res.status(500).json({error})
        })
};

exports.getOneUser = (req, res, next)=>{
    //Chercher le userId
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwtUtils.decodedToken(token);
    const userId = decodedToken.userId;

    //Trouver le User avec l'Id
    models.User.findOne( {attributes:['id', 'name', 'email', 'isAdmin'], where : {id : userId }})
        .then(function(user){
            res.status(200).json({user})
        })
        .catch (function(error){
            res.status(400).json({error})
        })
};

//Modifier email
exports.modifyUserEmail = (req, res, next)=>{
    //Chercher userId
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwtUtils.decodedToken(token);
    const userId = decodedToken.userId;

    //Récupérer nouveau mail
    const newEmail = {...req.body};

    //Modifier dans DB
    models.User.update({...newEmail, id : userId}, {where : {id: userId}})
    .then (function(){
        res.status(200).json({message : 'Email modifié !'})
    })
    .catch (function(error){
        res.status(400).json({error})
    })
};

//Modifier mot de passe
exports.modifyUserPassword = (req, res, next)=>{
    //Chercher userId
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwtUtils.decodedToken(token);
    const userId = decodedToken.userId;
    console.log(userId)

    //Récupérer nouveau mot de passe
    const newPassword = req.body.password;
    console.log(newPassword)
    //Hasher le nouveau mot de passe
    models.User.findOne({where : {id: userId}})
        .then(function(user){
            bcrypt.compare(newPassword, user.password)
            .then(function(samePassword){
                if(samePassword){
                    res.status(400).json({message: 'Mot de passe identique.'})
                }
                else{
                    bcrypt.hash(newPassword, 10)
                    .then(function(hash){
                        models.User.update({password : hash}, {where : {id : userId}})
                        .then(function(){
                            res.status(200).json({message : 'Mot de passe modifié !'})
                        })
                        .catch(function(){
                            res.status(400).json({error})
                        })
                    })
                    .catch(function(error){
                        res.status(500).json({error})
                    })
                }
            })
            .catch(function(error){
                res.status(500).json({error})
            })
        })
        .catch(function(error){
            res.status(500).json( {error})
        })
};

//Supprimer utilisateur
exports.deleteUser = (req, res, next)=>{
    //Chercher userId
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwtUtils.decodedToken(token);
    const userId = decodedToken.userId;
    console.log(userId)

    //Trouver l'utilisateur
    models.Post.destroy({where: {userId : userId}})
        .then(function(){
            models.Comment.destroy({where:{userId : userId}})
            .then(function(){
                models.User.destroy({where : {id : userId}})
                .then(function(){
                    res.status(200).json({message : 'Utilisateur supprimé !'})
                })  
                .catch (function(error){
                    res.status(400).json({error})
                })  
            })
            .catch(function(error){
                res.status(400).json({message : 'Erreur lors de la suppression des commentaires'})
            })

        })
        .catch(function(error){
            res.status(400).json({message : 'Erreur lors de la suppression des posts'})
        })
   
}