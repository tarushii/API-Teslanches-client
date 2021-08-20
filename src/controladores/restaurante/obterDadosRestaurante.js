const { erros } = require('../../erros/perfilRestaurante');
const knex = require('../../banco_de_dados/conexao');

const obterDadosRestaurante = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await knex.raw(`select usuario.id,usuario.nome as nomeUsuario,usuario.email,restaurante.nome,restaurante.categoria_id,restaurante.descricao,restaurante.taxa_entrega,restaurante.tempo_entrega_minutos,restaurante.valor_minimo_pedido, restaurante.imagem_restaurante
      from usuario
      JOIN restaurante ON restaurante.usuario_id = usuario.id WHERE usuario.id = ${id};
      `);
    if (user.length === 0) {
      return res.status(400).json(erros.dadoIncorreto);
    }

    return res.status(200).json(user.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { obterDadosRestaurante };
