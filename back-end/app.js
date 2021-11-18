//Importer express 
const express = require('express');

//Connecter à la Database groupomania

//Créer l'application express
const app = express(); 

//Paramètrer les accès de notre API
app.use((req, res, next) => {
    //Permission pour tout origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Permission pour certains entêtes
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //Permission pour certaines méthodes 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Importer body-parser
const bodyParser = require('body-parser');

//Transformer le corps de la requête POST en objet javascript
app.use(bodyParser.json())

//Importer le routeur User
const userRoutes = require('./routes/user')

//Importer le chemin du système de fichier
const path = require('path')

//Indiquer comment traiter les requêtes sur /images
app.use('/images', express.static(path.join(__dirname, 'images')));
//Créer le point d'accès de userRoute
app.use('/api/user', userRoutes)

//Exporter l'application
module.exports = app;