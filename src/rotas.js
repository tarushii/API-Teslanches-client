const express = require('express');
const { verificarLogin } = require('./filtros/validarLogin');
const { registrarConsumidor } = require('./controladores/cadastro');
const { loginConsumidor } = require('./controladores/login');

const rota = express();

rota.post('/cadastro', registrarConsumidor);
rota.post('/login', loginConsumidor);

rota.use(verificarLogin);

module.exports = rota;
