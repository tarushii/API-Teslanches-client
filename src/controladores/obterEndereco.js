const jwt = require('jsonwebtoken');
const knex = require('../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;
const obterEndereco = async (req, res) => {
  const dadosUsuario = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  // eslint-disable-next-line camelcase
  const id = dadosUsuario.ID;
  try {
    const user = await knex('endereco').select('*').where({ consumidor_id: id });

    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { obterEndereco };
