const { Sequelize } = require('sequelize'); //faz o js interagir com o sqlite
const path = require('path');
const config = require('../config/config.json');


const env = process.env.NODE_ENV || 'development';// Determinar o ambiente virtual


const dbConfig = config[env];// Carregar as configurações do ambiente virtual

// Ajustar o caminho do arquivo SQLite
if (dbConfig.dialect === 'sqlite' && dbConfig.storage) {
  dbConfig.storage = path.join(__dirname, dbConfig.storage);
}

// Inicializar o Sequelize configurado
const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;