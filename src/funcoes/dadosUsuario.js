const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const knex = require('../banco_de_dados/conexao');

const dados = async (req) => {
  const tokenUsuario = req.header('tokenUsuario');

  try {
    const { Email: email } = jwt.verify(tokenUsuario, jwtSecret);
    const usuario = await knex('consumidor').select('*').where({ email });

    return usuario;
  } catch (error) {
    return error.message;
  }
};

module.exports = { dados };
