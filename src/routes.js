const express = require("express");

const authMiddleware = require("./middleware/authorization");
const uploadSingleImage = require("./middleware/uploadSingleImage");
const uploadFirebase = require("./services/uploadFirebase");

const studentController = require("./controllers/students");
const studentImagesController = require("./controllers/studentImages");
const questionController = require("./controllers/questions");
const answersController = require("./controllers/answer");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");
const categoriesController = require("./controllers/categories");

const studentValidators = require("./validators/students");
const questionValidators = require("./validators/questions");
const answerValidators = require("./validators/answers");

const routes = express.Router();

// const upload = multer.single("arquivo");

// routes.post("/upload", (req, res) => {

//     const handleError = (error) => {
//         if (error) {
//             res.status(400).send({ error: "Arquivo Inválido" });
//         }

//         console.log(req.file);

//         res.send(req.file);
//     }

//     upload(req, res, handleError);
// });

//Rotas públicas
routes.post("/sessions", sessionController.store);

routes.post("/students", studentValidators.create, studentController.store);

routes.use(authMiddleware);

//Rotas de Alunos
routes.get("/students", studentController.index);

routes.get("/students/:id", studentController.find);

routes.delete("/students/:id", studentController.delete);

routes.put("/students/:id", studentController.update);

routes.post(
  "/students/:id/images",
  uploadSingleImage,
  uploadFirebase,
  studentImagesController.store
);

//Rotas de Perguntas
routes.post(
  "/questions",
  uploadSingleImage,
  uploadFirebase,
  questionValidators.create,
  questionController.store
);

routes.put("/questions/:id", questionController.update);

routes.delete("/questions/:id", questionController.delete);

//Rotas de Respostas

routes.post(
  "/questions/:id/answers",
  answerValidators.create,
  answersController.store
);

//Rotas do feed

routes.get("/feed", feedController.index);

//Rotas de Categorias

routes.get("/categories", categoriesController.index);

module.exports = routes;
