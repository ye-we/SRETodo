const { Router } = require("express");
const router = Router();
const appControllers = require("../controllers/appControllers");

// Create a Todos table(relation)
router.get("/api/createTodosTable", appControllers.createTodosTable);

// Get all todos route
router.get("/api/getAllTodos", appControllers.getAllTodos);

// Add a new collection
router.get("/api/addNewCollection", appControllers.addNewCollection);

// Get all collections
router.get("/api/getAllCollections", appControllers.getAllCollections);

// Add a new todo route
router.post("/api/addNewTodo", appControllers.addNewTodo);

// Get todos of a collection
router.get(
  "/api/getTodosFromCollection/:id",
  appControllers.getTodosFromCollection
);

// Delete a todo
router.post("/api/deleteTodo/:id", appControllers.deleteTodo);

// Update a todo
router.post("/api/updateTodo/:id", appControllers.updateTodo);

// Get a collection based on its id
router.get("/api/getFinishedCount/:id", appControllers.getFinishedCount);

module.exports = router;
