const express = require('express');
const { verificarLogin } = require('./filtros/validarLogin');
const { registrarConsumidor } = require('./controladores/cadastro');
const { loginConsumidor } = require('./controladores/login');
const { listarRestaurantes, buscarRestaurante } = require('./controladores/restaurante');

const rota = express();

rota.post('/cadastro', registrarConsumidor);
rota.post('/login', loginConsumidor);

rota.get('/restaurantes/:nomeRestaurante', buscarRestaurante);
rota.use(verificarLogin);
rota.get('/restaurantes', listarRestaurantes);

module.exports = rota;
