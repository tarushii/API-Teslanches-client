const yup = require('../funcoes/yup');

const registroEnderecoSchema = yup.object().shape({
  email: yup.string().email().required(),
  cep: yup.number().required(),
  endereco: yup.string().required(),
  complemento: yup.string().required(),
});

module.exports = { registroEnderecoSchema };
