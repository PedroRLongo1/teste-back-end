//faz a requisição para listar os usuários
const User = require('../models/user-model'); //pega as propriedades do user

class ListarUsuarioController {
  async handle(req, res) {
    try {
      const userId = req.params?.id;
      const usuario = await User.findByPk(userId); //encontra o user pelo id
      if (!usuario && userId) {
        return {
          statusCode: 404,
          body: { error: 'Usuário não encontrado' },
        };
      } else if (userId) {
        return {
          statusCode: 200,
          body: usuario,
        };
      }
      const usuarios = await User.findAll();
      return {
        statusCode: 200,
        body: usuarios,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: error.message },
      };

    }
  }
}

module.exports = ListarUsuarioController;