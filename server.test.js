/* eslint-disable no-undef */
const request = require('supertest');
const app = require('./src/index');

describe('Login', () => {
  test('O usuário deve logar', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste@email.com',
      senha: '1234567890',
    });
    expect(response.statusCode).toBe(202);
  });

  test('A resposta deve conter o Token de Usuário', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste@email.com',
      senha: '1234567890',
    });
    expect(response.body.tokenUsuario).toBeDefined();
  });

  test('Não deve logar sem email', async () => {
    const response = await request(app).post('/login').send({
      email: '',
      senha: '1234567890',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Não deve logar sem senha', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste@email.com',
      senha: '',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Não deve logar com email errado', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste@email.comm',
      senha: '1234567890',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Não deve logar com senha errada', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste@email.com',
      senha: '12345678901',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('Registro', () => {
  // Importante editar isso a cada teste. Se não dará que o usuário já existe
  const usuario = {
    nome_usuario: 'teste',
    email: 'teste2@email.com',
    telefone: 71999495016,
    senha: '1234567890',
  };

  // Use um usuário pré-cadastrado para executar este teste
  const usuarioExistente = {
    nome_usuario: 'teste',
    email: 'teste@email.com',
    telefone: 71999495016,
    senha: '1234567890',
  };

  test('O usuário deve ser criado', async () => {
    const response = await request(app).post('/cadastro').send(usuario);
    expect(response.statusCode).toBe(201);
  });

  test('Não deve registrar se o email já existir', async () => {
    const response = await request(app).post('/cadastro').send(usuarioExistente);
    expect(response.statusCode).toBe(400);
  });

  test('Não deve registrar sem nome de usuario', async () => {
    const response = await request(app).post('/cadastro').send({
      nome_usuario: '',
      email: 'uthan5@email.com',
      telefone: 71999495016,
      senha: '84brfbt3',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Não deve registrar sem email', async () => {
    const response = await request(app).post('/cadastro').send({
      nome_usuario: 'uthan84',
      email: '',
      telefone: 71999495016,
      senha: '84brfbt3',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Não deve registrar sem telefone', async () => {
    const response = await request(app).post('/cadastro').send({
      nome_usuario: 'uthan84',
      email: 'uthan5@email.com',
      telefone: '',
      senha: '84brfbt3',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Não deve registrar sem senha', async () => {
    const response = await request(app).post('/cadastro').send({
      nome_usuario: 'uthan84',
      email: 'uthan5@email.com',
      telefone: 71999495016,
      senha: '',
    });
    expect(response.statusCode).toBe(400);
  });
});
