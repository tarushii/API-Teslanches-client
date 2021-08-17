const { registroEnderecoSchema } = require('../validacoes/registroEnderecoSchema');
const { erros } = require('../erros/registroEndereco');
const knex = require('../banco_de_dados/conexao');

const registrarEndereco = async (req, res) => {
  const {
    email, cep, endereco, complemento,
  } = req.body;

  try {
    await registroEnderecoSchema.validate(req.body);
    const usuarios = await knex('consumidor').select('id').where({ email });
    // eslint-disable-next-line camelcase
    const usuario_id = usuarios[0].id;
    const enderecos = await knex('endereco').select('id').where({ usuario_id });

    if (usuarios.length === 0) {
      return res.status(400).json(erros.usuarioInvalido);
    }

    if (enderecos.length > 0) {
      return res.status(400).json(erros.enderecoCadastrado);
    }

    // eslint-disable-next-line no-unused-vars
    const adicionarEndereco = await knex('endereco').insert({
      usuario_id, cep, endereco, complemento,
    });

    return res.status(201).json('Endereço adicionado com sucesso!');
  } catch (error) {
    return res.status(400).json(`erro: ${error.message}`);
  }
};

module.exports = { registrarEndereco };
