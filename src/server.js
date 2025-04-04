require('dotenv').config(); // carrega tudo de dentro do "./.env"
//importações
const express = require('express');
const prompt = require('prompt');
const fs = require('fs'); //interaje com arquivos
const path = require('path'); //manipula os caminhos
const { swaggerUi, specs } = require('./swaggerConfig'); // SwaggerConfig
const sequelize = require('./database'); // database config
const User = require('./models/user-model'); // usermodel
const middlewares = require('./middlewares'); // middlewares

const app = express(); //cria o servidor com express

const initPort = process.env.PORT || 3000;
console.log(`Servidor na porta ${initPort}`); //config port

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); //config swagger

//faz o root ser em api-root
app.get('/', (req, res) => {
    res.redirect('/api-root');
});

app.use(middlewares.cors);
app.use(middlewares.contentType);
app.use(middlewares.bodyParser);

//carrega as rotas em routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
    const route = require(`./routes/${file}`);
    app.use('/api', route);
});

//iniciar o servidor
const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
        console.log(`Documentação da API disponível em http://localhost:${port}/api-root`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Porta ${port} está ocupada.`);
            const newPort = port + 1;
            promptUserForNewPort(newPort);
        } else {
            console.error(err);
        }
    });
};

// Função para alterar de porta caso a porta esteja ocupada
const promptUserForNewPort = (newPort) => {
    prompt.start(); //utiliza a biblioteca prompt
    const schema = {
        properties: {
            useNewPort: {
                description: `Porta ${newPort} está disponível. Deseja usar essa porta? (sim/não)`,
                pattern: /^(sim|não|s|n)$/i,
                message: 'Responda com "sim" ou "não"',
                required: true
            }
        }
    };

    prompt.get(schema, (err, result) => {
        if (result.useNewPort.toLowerCase() === 'sim' || result.useNewPort.toLowerCase() === 's') {
            startServer(newPort);
        } else {
            console.log('Servidor não iniciado.');
        }
    });
};

// Sincroniza o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado');
    startServer(initPort);
}).catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});