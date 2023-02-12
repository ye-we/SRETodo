const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

// Creates a remote connection to a mySQL server (db4free)
const db = mysql.createPool({
  multipleStatements: true,
  host: "db4free.net",
  user: process.env.mysql_user,
  password: process.env.mysql_pass,
  database: process.env.mysql_db,
});

// Create a new table
module.exports.createTodosTable = (req, res) => {
  const q =
    "CREATE TABLE Todos (id INT NOT NULL AUTO_INCREMENT, collectionId INT,title VARCHAR(100) NOT NULL,entryDate date NOT NULL,completed BOOLEAN, PRIMARY KEY(ID), FOREIGN KEY (collectionId) REFERENCES Collections(id))";
  // const q = "Drop table Todos";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

module.exports.createCollectionsTable = (req, res) => {
  const q =
    "CREATE TABLE Collections(id INT NOT NULL AUTO_INCREMENT,name VARCHAR(100) NOT NULL,PRIMARY KEY(ID))";
  // const q = "Drop table Collections";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Fetch all the todos from our database
module.exports.getAllTodos = (req, res) => {
  const q = "SELECT * FROM Todos";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Add a new to do based on the user input
module.exports.addNewTodo = (req, res) => {
  const q =
    "INSERT INTO Todos(`collectionId`,`title`,`entryDate`,`completed`) VALUES (?)";
  const values = [
    Number(req.body.collection),
    req.body.title,
    req.body.date,
    false,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Get todo lists of a collection
module.exports.getTodosFromCollection = (req, res) => {
  const q = `SELECT * FROM Collections JOIN Todos ON Collections.id=Todos.collectionId AND Collections.id=${req.params.id}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Delete a todo
module.exports.deleteTodo = (req, res) => {
  const q = `DELETE FROM Todos WHERE id=${req.params.id}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Update a todo
module.exports.updateTodo = (req, res) => {
  const newTitle = req.body.newTitle;
  const completed = req.body.completed;
  const q = `UPDATE Todos SET completed=${completed}, title='${newTitle}' WHERE id=${req.params.id}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Add a new collection
module.exports.addNewCollection = (req, res) => {
  const q = "INSERT INTO Collections(`name`) VALUES (?)";
  const values = req.body.name;
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// Fetch all the todos from our database
module.exports.getAllCollections = (req, res) => {
  const q = "SELECT * FROM Collections;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
};

module.exports.getFinishedCount = (req, res) => {
  const q = `SELECT COUNT (*) FROM Todos WHERE collectionId=${req.params.id};SELECT COUNT (id) FROM Todos WHERE completed = 1 AND collectionId=${req.params.id}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

// module.exports.getTodosCount = (req, res) => {
//   const q = `SELECT COUNT (id) FROM Todos WHERE collectionId=${req.params.id};SELECT COUNT (id) FROM Todos WHERE completed = 1 AND collectionId=${req.params.id}`;
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// };
