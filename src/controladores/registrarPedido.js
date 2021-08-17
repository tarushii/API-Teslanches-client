const { registroPedidoSchema } = require('../validacoes/registroPedidoSchema');
const { erros } = require('../erros/registroPedido');
const knex = require('../banco_de_dados/conexao');

const registrarPedido = async (req, res) => {
  const {
    idRestaurante,
    idConsumidor,
    valorProdutos,
    taxaDeEntrega,
    valorTotal,
    enderecoDeEntrega,
    carrinho,
  } = req.body;

  try {
    await registroPedidoSchema.validate(req.body);
    const usuarios = await knex('consumidor').select('id').where({ id: idConsumidor });
    const restaurantes = await knex('restaurante').select('id').where({ id: idRestaurante });

    if (usuarios.length === 0) {
      return res.status(400).json(erros.usuarioNaoExiste);
    }

    if (restaurantes.length === 0) {
      return res.status(400).json(erros.restauranteNaoExiste);
    }

    // eslint-disable-next-line no-unused-vars
    const adicionarPedido = await knex('pedido').insert({
      restaurante_id: idRestaurante,
      consumidor_id: idConsumidor,
      valor_produtos: valorProdutos,
      taxa_entrega: taxaDeEntrega,
      valor_total: valorTotal,
      endereco_entrega: enderecoDeEntrega,
    });

    // eslint-disable-next-line no-unused-vars
    const pedidoAtual = await knex('pedido').select('id').where({ consumidor_id: idConsumidor });
    const maiorIndex = pedidoAtual.length - 1;
    // eslint-disable-next-line camelcase
    const pedido_id = pedidoAtual[maiorIndex].id;
    const keys = Object.keys(carrinho);
    keys.forEach(async (key) => {
      const itemAtual = carrinho[key];

      // eslint-disable-next-line no-unused-vars
      const adicionarItem = await knex('carrinho').insert({
        pedido_id,
        produto_id: itemAtual.id,
        nome: itemAtual.nome,
        preco: itemAtual.preco,
        quantidade: itemAtual.quantidade,
        valor_total: itemAtual.valorTotal,
      });
    });

    return res.status(201).json('Pedido realizado com sucesso!');
  } catch (error) {
    return res.status(400).json(`erro: ${error.message}`);
  }
};

module.exports = { registrarPedido };
