const express = require('express');
const { registrarConsumidor } = require('./controladores/cadastro');

const rota = express();

rota.post('/cadastro', registrarConsumidor);

module.exports = rota;
