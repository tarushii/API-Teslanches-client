const yup = require('../funcoes/yup');

const registroPedidoSchema = yup.object().shape({
  idRestaurante: yup.number().required(),
  idConsumidor: yup.number().required(),
  taxaDeEntrega: yup.number().required(),
  valorTotal: yup.number().required(),
  enderecoDeEntrega: yup.string().required(),
});

module.exports = { registroPedidoSchema };
