//Importa o express
const express = require("express");

//importa as rotas
const routes = require("./routes");
const { errors } = require("celebrate");

require("./database");

//Cria a aplicação express
const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());

module.exports = app;