//Importa o express
const express = require("express");

//importa as rotas
const routes = require("./routes");
const { errors } = require("celebrate");

const cors = require("cors");

require("./database");

//Cria a aplicação express
const app = express();

app.use(express.json());

app.use(cors());

//definimos a pasta upload como pública, servindo arquivos estáticos
app.use("/uploads", express.static("uploads"));

app.use(routes);

app.use(errors());

module.exports = app;
