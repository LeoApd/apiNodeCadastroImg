const express = require('express');
const bodyparse = require('body-parser');
const cors = require('cors');
const api = express();
const porta = 3333;
const galeriaRouter = require('./router/galeriaRouter');

api.use(cors());

api.use(bodyparse.urlencoded({extended: true}));
api.use(bodyparse.json({limit: '20mb', extended: true}));

//diretorio publico
api.use('/public', express.static(__dirname + 'public'));

api.use('/galeria', galeriaRouter);

api.listen(porta);
