//Importer express
const express = require('express');

//Créer le routeur
const routeur = express.Router();

//Importer le fichier controller
const postCtrl = require('../controllers/post');
//Importer le middleware Auth
const auth = require('../middleware/auth');
//Importer le middleware multer
const multer = require('../middleware/multer-config');

routeur.post('/', auth, multer, postCtrl.createPost);
routeur.get('/', auth, multer, postCtrl.getAllPost);
routeur.get('/:id', auth, postCtrl.getOnePost);
routeur.put('/:id', auth, multer, postCtrl.modifyPost);
routeur.delete('/:id', auth, multer, postCtrl.deletePost);
routeur.post('/:id/like', auth, postCtrl.modifyLike);

module.exports = routeur;