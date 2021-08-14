const knex = require('../banco_de_dados/conexao');

const listarRestaurantes = async (req, res) => {
  try {
    const restaurantes = await knex('restaurante').select('*');

    if (restaurantes.length === 0) {
      return res.status(400).json('Não existem restaurantes disponiveis no momento');
    }

    return res.status(202).json(restaurantes);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const buscarRestaurante = async (req, res) => {
  const { nomeRestaurante } = req.params;
  try {
    const restaurantes = await knex('restaurante').select('*').where({ nomeRestaurante });

    if (restaurantes.length === 0) {
      return res.status(400).json('Não existem restaurante com este nome');
    }

    return res.status(202).json(restaurantes);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { listarRestaurantes, buscarRestaurante };
