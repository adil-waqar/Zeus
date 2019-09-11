const { Todo } = require('../models');
const { TodoItem } = require('../models');

module.exports = {
  create(req, res) {
    return Todo.create({
      title: req.body.title
    })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Todo.findAll({
      include: [
        {
          model: TodoItem,
          as: 'todoItems'
        }
      ]
    })
      .then(todos => res.status(200).send(todos))
      .catch(err => res.status(400).send(err));
  },
  retrieve(req, res) {
    return Todo.findByPk(req.params.todoId, {
      include: [
        {
          model: TodoItem,
          as: 'todoItems'
        }
      ]
    })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo not found'
          });
        }
        return res.status(200).send(todo);
      })
      .catch(err => res.status(400).send(err));
  },
  update(req, res) {
    return Todo.findByPk(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo not found'
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title
          })
          .then(() => res.status(200).send(todo))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }
};
