const jwt = require('jsonwebtoken');
const { erros } = require('../erros/listarPedidos');
const knex = require('../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const listarPedidos = async (req, res) => {
  const dadosUsuario = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  // eslint-disable-next-line camelcase
  const consumidor_id = dadosUsuario.ID;

  try {
    const pedidos = await knex('pedido').select('*').where({ consumidor_id });

    if (pedidos.length === 0) {
      return res.status(404).json(erros.semPedidos);
    }

    const output = {
      Nome: dadosUsuario.NomeUsuario,
      Pedidos: {
        ...pedidos,
      },
    };

    return res.status(200).json(output);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { listarPedidos };
