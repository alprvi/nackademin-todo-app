const todoItemModel = require("../models/todoItemModel");

exports.createTodoItem = async (req, res) => {
  const { title } = req.body;
  try {
    const item = await todoItemModel.createTodoItem(title);
    res.json(item);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.deleteTodoItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await todoItemModel.deleteTodoItem(itemId);
    res.json({ message: "Number of items deleted from the list: " + item });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.updateTodoItem = async (req, res) => {
  const itemId = req.params.id;
  const { title } = req.body;
  try {
    const item = await todoItemModel.updateTodoItem(itemId, title);
    res.json({ message: "Number of updated items: " + item });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.getTodoItems = async (req, res) => {
  try {
    const items = await todoItemModel.getTodoItems();
    res.json(items);
  } catch (error) {
    res.json({ error: error.message });
  }
};
