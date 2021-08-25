const express = require('express');
const { verificarLogin } = require('./filtros/validarLogin');
const { registrarConsumidor } = require('./controladores/cadastro');
const { loginConsumidor } = require('./controladores/login');
const { listarRestaurantes, buscarRestaurante } = require('./controladores/restaurante');
const { obterDadosRestaurante } = require('./controladores/restaurante/obterDadosRestaurante');
const { listarProdutos } = require('./controladores/restaurante/listarProdutos');
const { registrarEndereco } = require('./controladores/cadastroEndereco');
const { registrarPedido } = require('./controladores/registrarPedido');
const { listarPedidos } = require('./controladores/listarPedidos');
const { listarDadosDoUsuario } = require('./controladores/listarDadosDoUsuario');

const rota = express();

rota.post('/cadastro', registrarConsumidor);
rota.post('/login', loginConsumidor);

rota.get('/restaurantes/:nomeRestaurante', buscarRestaurante);
rota.use(verificarLogin);
rota.get('/restaurantes', listarRestaurantes);

rota.get('/restaurante/:id', obterDadosRestaurante);
rota.get('/restaurate/:id/perfil', listarProdutos);

rota.get('/consumidor', listarDadosDoUsuario);
rota.get('/consumidor/pedidos', listarPedidos);
rota.patch('/consumidor/adicionarEndereco', registrarEndereco);
rota.post('/consumidor/registrarPedido', registrarPedido);

module.exports = rota;
