const express = require("express");
const router = express.Router();
const todoItemController = require("../controller/todoItemController.js");

// Create new Item
router.post("/", todoItemController.createTodoItem);

// Delete existing Item
router.delete("/:id", todoItemController.deleteTodoItem);

// Modify existing Item
router.put("/:id", todoItemController.updateTodoItem);

// Get all Items
router.get("/", todoItemController.getTodoItems);

module.exports = router;
