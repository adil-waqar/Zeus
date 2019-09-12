const { TodoItem } = require('../models');

module.exports = {
  create(req, res) {
    return TodoItem.create({
      content: req.body.content,
      todoId: req.params.todoId
    })
      .then(todoItem => res.status(200).send(todoItem))
      .catch(err => res.status(400).send(err));
  },
  list(req, res) {
    return TodoItem.findAll()
      .then(todoItems => res.status(200).send(todoItems))
      .catch(err => res.status(400).send(err));
  },
  update(req, res) {
    return TodoItem.findOne({
      where: {
        id: req.params.todoItemId,
        todoId: req.params.todoId
      }
    })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'Todo item not found'
          });
        }
        return todoItem
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedTodoItem =>
            res.status(200).send({
              message: 'Resource updated successfully',
              todoItem: updatedTodoItem
            })
          )
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },
  delete(req, res) {
    return TodoItem.findOne({
      where: {
        id: req.params.todoItemId,
        todoId: req.params.todoId
      }
    })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'Todo item not found'
          });
        }
        return todoItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }
};
