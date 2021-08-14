const express = require('express');
const { verificarLogin } = require('./filtros/validarLogin');
const { registrarConsumidor } = require('./controladores/cadastro');
const { loginConsumidor } = require('./controladores/login');
const { listarRestaurantes, buscarRestaurante } = require('./controladores/restaurante');

const rota = express();

rota.post('/cadastro', registrarConsumidor);
rota.post('/login', loginConsumidor);

rota.get('/restaurantes', listarRestaurantes);
rota.get('/restaurantes/:nomeRestaurante', listarRestaurantes);
rota.use(verificarLogin);

module.exports = rota;
