/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/index');

describe('Login', () => {
  test('O usuário deve logar', async () => {
    const response = await request(app).post('/login').send({
      email: 'uthan3@email.com',
      senha: '84brfbt3',
    });
    expect(response.statusCode).toBe(202);
  });

  test('A resposta deve conter o Token de Usuário', async () => {
    const response = await request(app).post('/login').send({
      email: 'uthan3@email.com',
      senha: '84brfbt3',
    });
    expect(response.body.tokenUsuario).toBeDefined();
  });

  test('Não loga sem email', async () => {
    const response = await request(app).post('/login').send({
      email: '',
      senha: '84brfbt3',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Não loga sem senha', async () => {
    const response = await request(app).post('/login').send({
      email: '',
      senha: '84brfbt3',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Não loga com email errado', async () => {
    const response = await request(app).post('/login').send({
      email: 'uthan3@email.comm',
      senha: '84brfbt3',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Não loga com senha errada', async () => {
    const response = await request(app).post('/login').send({
      email: 'uthan3@email.com',
      senha: '84brfbt34',
    });
    expect(response.statusCode).toBe(400);
  });
});
