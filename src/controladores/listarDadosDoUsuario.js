const jwt = require('jsonwebtoken');
const { erros } = require('../erros/listarDadosDoUsuario');
const knex = require('../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const listarDadosDoUsuario = async (req, res) => {
  const dadosConsumidor = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  // eslint-disable-next-line camelcase
  const consumidor_id = dadosConsumidor.ID;

  try {
    const consumidor = await knex('consumidor').select('id', 'nome_usuario', 'email', 'telefone').where({ id: consumidor_id });

    if (consumidor.length === 0) {
      return res.status(404).json(erros.semUsuario);
    }

    return res.status(200).json(consumidor);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { listarDadosDoUsuario };
