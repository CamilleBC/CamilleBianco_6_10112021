//Importer express
const express = require('express');

//Créer le routeur
const routeur = express.Router();

//Importer le fichier controller
const commentCtrl = require('../controllers/comment');
//Importer le middleware Auth
const auth = require('../middleware/auth');

routeur.post('/', auth, commentCtrl.createComment);
routeur.get('/', auth, commentCtrl.getAllComments);

module.exports = routeur;