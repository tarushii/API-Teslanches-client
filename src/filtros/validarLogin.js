const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { erros } = require('../erros/validacaoLogin');
const { verificarLoginSchema } = require('../validacoes/validarLoginSchema');
const knex = require('../banco_de_dados/conexao');

// eslint-disable-next-line consistent-return
const verificarLogin = async (req, res, next) => {
  const tokenUsuario = req.header('tokenUsuario');

  try {
    await verificarLoginSchema.validate({ tokenUsuario });
    const { Email: email } = jwt.verify(tokenUsuario, jwtSecret);
    const usuario = await knex('consumidor').select('*').where({ email });

    if (usuario.length === 0) {
      return res.status(401).json(erros.precisaLogar);
    }

    next();
  } catch (error) {
    if (error.message === 'invalid signature') {
      return res.status(401).json(erros.precisaLogar);
    }

    if (error.message === 'jwt expired') {
      return res.status(401).json(erros.precisaLogar);
    }

    return res.status(400).json(error.message);
  }
};

module.exports = { verificarLogin };
