const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { loginSchema } = require('../validacoes/loginSchema');
const { decrypt } = require('../funcoes/criptografia');
const { erros } = require('../erros/login');
const knex = require('../banco_de_dados/conexao');

const loginConsumidor = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await loginSchema.validate(req.body);
    const usuario = await knex('consumidor').select('*').where({ email });

    if (usuario.length === 0) {
      return res.status(400).json(erros.dadoIncorreto);
    }

    const senhaUsuario = decrypt(usuario[0].senha);

    if (senha !== senhaUsuario) {
      return res.status(400).json(erros.dadoIncorreto);
    }

    const tokenUsuario = jwt.sign({
      ID: usuario[0].id,
      NomeUsuario: usuario[0].nome_usuario,
      Email: usuario[0].email,
    }, jwtSecret, { expiresIn: '1h' });

    const auth = {
      usuario: {
        ID: usuario[0].id,
        NomeUsuario: usuario[0].nome_usuario,
        Email: usuario[0].email,
      },
      tokenUsuario,
    };

    return res.status(202).json(auth);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { loginConsumidor };
