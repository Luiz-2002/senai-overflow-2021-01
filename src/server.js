const app = require("./app");

//Porta do servidor HTTP
const PORT = 3333;

//Subindo o servidor na web
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});