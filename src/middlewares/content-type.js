//informa o servidor qual o tipo da requisição ou resposta
const contentType = (req, res, next) => {
    res.type('json'); 
    next(); //chama o próximo middleware
};

module.exports = contentType;