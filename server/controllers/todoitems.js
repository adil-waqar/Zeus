const TodoItem = require('../models').TodoItem;

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
  }
};
