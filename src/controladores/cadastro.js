/* eslint-disable linebreak-style */
const { encrypt } = require('../funcoes/criptografia');
const { registroSchema } = require('../validacoes/registroSchema');
const { erros } = require('../erros/registro');
const knex = require('../banco_de_dados/conexao');

const registrarConsumidor = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { nome_usuario, email, telefone } = req.body;
  let { senha } = req.body;

  try {
    await registroSchema.validate(req.body);
    const usuarios = await knex('consumidor').select('email').where({ email });

    if (usuarios.length > 0) {
      return res.status(400).json(erros.emailJaRegistrado);
    }

    senha = encrypt(senha);
    // eslint-disable-next-line no-unused-vars
    const novoConsumidor = await knex('consumidor').insert({
      nome_usuario, email, telefone, senha,
    });

    return res.status(201).json('Usuário registrado com sucesso!');
  } catch (error) {
    return res.status(400).json(`erro: ${error.message}`);
  }
};

module.exports = { registrarConsumidor };
