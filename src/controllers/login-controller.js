const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
    /**
     * @param {HttpRequest} httpRequest - Objeto da requisição HTTP
     * @returns {Promise<HttpResponse>}
     */
    async handle(httpRequest) {
        try {
            const { email, senha } = httpRequest.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return {
                    statusCode: 404,
                    body: { message: 'Usuário não encontrado' }
                };
            }

            const senhEhValida = await bcrypt.compare(senha, user.senha); //vaçida a senha
            if (!senhEhValida) {
                return {
                    statusCode: 401,
                    body: { message: 'Credenciais inválidas' }
                };
            }

            // token JWT
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN // Token válido por 1 hora
            });

            return {
                statusCode: 200,
                body: { token }
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: { message: 'Erro interno do servidor', error: error.message }
            };
        }
    }
}

module.exports = LoginController;