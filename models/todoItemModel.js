module.exports = {
  createTodoItem: function (title, status) {
    return new Promise(async (resolve, reject) => {
      try {
        const item = await db.todoItems.insert({ title, status });
        resolve(item);
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteTodoItem: function (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const item = await db.todoItems.remove({ _id: id });
        resolve(item);
      } catch (error) {
        reject(error);
      }
    });
  },

  updateTodoItem: function (id, title, status) {
    return new Promise(async (resolve, reject) => {
      try {
        const item = await db.todoItems.update(
          { _id: id },
          { title, status },
          {}
        );
        resolve(item);
      } catch (error) {
        reject(error);
      }
    });
  },

  getTodoItems: function () {
    return new Promise(async (resolve, reject) => {
      try {
        const items = await db.todoItems.find({});
        resolve(items);
      } catch (error) {
        reject(error);
      }
    });
  },
};
