const jwt = require('jsonwebtoken');
const { erros } = require('../../erros/perfilRestaurante');
const knex = require('../../banco_de_dados/conexao');

const jwtSecret = process.env.JWT_SECRET;

const listarProdutos = async (req, res) => {
  const dadosUsuarios = jwt.verify(req.header('tokenUsuario'), jwtSecret);
  // eslint-disable-next-line no-unused-vars
  const { ID } = dadosUsuarios;
  const { id } = req.params;

  try {
    const produtos = await knex('produto').select('*').where({ restaurante_id: id });

    if (produtos.length === 0) {
      return res.status(400).json(erros.dadoIncorreto);
    }

    res.status(200).json(produtos);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { listarProdutos };
