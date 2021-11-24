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

module.exports = routeur;