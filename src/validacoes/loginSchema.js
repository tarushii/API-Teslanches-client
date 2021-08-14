const yup = require('../funcoes/yup');

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

module.exports = { loginSchema };
