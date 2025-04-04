//faz a requisição para deletar um usuário
const User = require('../models/user-model'); //pega as propriedades
class DeletarUsuarioController {
    async handle(req, res) {
        const { id } = req.params;
        try {
            const usuario = await User.findByPk(id); //acha o usuário pelo id

            if (!usuario) {
                return {
                    statusCode: 404,
                    body: { error: 'Usuário não encontrado' },
                };
            }
            await usuario.destroy();
            return {
                statusCode: 204,
                body: {},
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: { error: error.message },
            };
        }  
    }
}

module.exports = DeletarUsuarioController;