const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USUARIO,
    password: process.env.DB_SENHA,
    database: process.env.DB_NOME,
  },
});

module.exports = knex;
