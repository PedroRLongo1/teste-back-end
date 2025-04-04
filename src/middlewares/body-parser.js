// converte os dados do corpo da requisição para o servidor ler
const { json } = require('express');
const bodyParser = json();
module.exports = bodyParser;