const { registroEnderecoSchema } = require('../validacoes/registroEnderecoSchema');
const { erros } = require('../erros/registroEndereco');
const knex = require('../banco_de_dados/conexao');

const registrarEndereco = async (req, res) => {
  const {
    email, cep, endereco, complemento,
  } = req.body;

  try {
    await registroEnderecoSchema.validate(req.body);
    const usuarios = await knex('consumidor').select('email').where({ email });

    if (usuarios.length === 0) {
      return res.status(400).json(erros.usuarioInvalido);
    }

    // eslint-disable-next-line no-unused-vars
    const adicionarEndereco = await knex('consumidor').update({
      cep, endereco, complemento,
    }).where({ email });

    return res.status(201).json('Endereço adicionado com sucesso!');
  } catch (error) {
    return res.status(400).json(`erro: ${error.message}`);
  }
};

module.exports = { registrarEndereco };
