const express = require("express");
const router = express.Router();
const todoItemController = require("../controller/todoItemController.js");

// Create new Item
router.post("/todos", todoItemController.createTodoItem);

// Delete existing Item
router.delete("/todos/:id", todoItemController.deleteTodoItem);

// Modify existing Item
router.put("/todos/:id", todoItemController.updateTodoItem);

// Get all Items
router.get("/todos", todoItemController.getTodoItems);

module.exports = router;
