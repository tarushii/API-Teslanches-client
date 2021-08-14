const yup = require('../funcoes/yup');

const registroSchema = yup.object().shape({
  nome_usuario: yup.string().required(),
  email: yup.string().email().required(),
  telefone: yup.number().required(),
  senha: yup.string().required(),
});

module.exports = { registroSchema };
