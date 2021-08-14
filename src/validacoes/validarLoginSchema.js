const yup = require('../funcoes/yup');

const verificarLoginSchema = yup.object().shape({
  tokenUsuario: yup.string().required(),
});

module.exports = { verificarLoginSchema };
