const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//imports dos models
const Student = require("../models/Student");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");


const connection = new Sequelize(dbConfig);

//inicializa os models
Student.init(connection);
Question.init(connection);
Category.init(connection);
Answer.init(connection);

//inicializa os relacionamentos
Student.associate(connection.models);
Question.associate(connection.models);
Category.associate(connection.models);
Answer.associate(connection.models);

// for (let assoc of Object.keys(Student.associations)) {
//     for (let accessor of Object.keys(Student.associations[assoc].accessors)) {
//         console.log(Student.name + '.' + Student.associations[assoc].accessors[accessor] + '()');
//     }
// }