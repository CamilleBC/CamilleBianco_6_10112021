//Importer express
const express = require('express');

//Créer le routeur
const routeur = express.Router();

//Importer le fichier controller
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

routeur.post('/signup', userCtrl.signup);
routeur.post('/login', userCtrl.login);
routeur.get('/profil', userCtrl.getOneUser)

module.exports = routeur;