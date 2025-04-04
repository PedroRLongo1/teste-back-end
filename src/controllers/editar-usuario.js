//faz a requisição para criar o usuário
const User = require('../models/user-model'); //pega as prorpiedades de user
class EditarUsuarioController {
    async handle(req, res) {
        const { id } = req.params; //pega os parametros do usuário pelo id e transforma-os em parte do corpo da requisição
        const { nome, email, senha } = req.body;
        try {
            const usuario = await User.findByPk(id);
            if (!usuario) {
                return {
                    statusCode: 404,
                    body: { error: 'Usuário não encontrado' }
                }
            }
            await usuario.update({
                nome,
                email,
                senha,
            });
            return {
                statusCode: 200,
                body: usuario,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: { error: error.message }
            }
        }
    }
}

module.exports = EditarUsuarioController;