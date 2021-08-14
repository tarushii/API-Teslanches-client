const express = require('express');
const { registrarConsumidor } = require('./controladores/cadastro');
const { loginConsumidor } = require('./controladores/login');

const rota = express();

rota.post('/cadastro', registrarConsumidor);
rota.post('/login', loginConsumidor);

module.exports = rota;
