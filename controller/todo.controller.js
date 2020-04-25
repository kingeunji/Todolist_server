const Todo = require('../models/Todo');

exports.getAll = (req, res) => {

    const {
        user_id
    } = req.body;

    if (!user_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Todo.getAll(user_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "err"
            })
        } else {
            res.send(data);
        }
    });

}

exports.insertTodo = (req, res) => {

    const {
        user_id,
        todo_item
    } = req.body;
    if (!user_id || !todo_item) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // create new Todo
    const newTodo = new Todo({
        user_id: user_id,
        todo_item: todo_item,
        done_flg: 0
    });

    Todo.create(newTodo, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "err"
            })
        } else {
            res.send(data);
        }
    })

}

exports.updateDone = (req, res) => {
    const {
        todo_id
    } = req.body;

    if (!todo_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Todo.updateByTodoId(todo_id, (err, data) => {
        if (err) {
            if (err.kind == 'not_found') {
                res.status(404).send({
                    message: `Not found Todo with todo_id ${todo_id}.`
                });
            } else {
                res.status(500).send({
                    message: 'err'
                });
            }
        } else {
            res.send(data);
        }
    });

}

exports.delete = (req, res) => {
    const {
        todo_id
    } = req.body;
    if (!todo_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Todo.delete(todo_id, (err, data) => {
        if (err) {
            if (err.kind == 'not_found') {
                res.status(404).send({
                    message: `Not found Todo with todo_id ${todo_id}.`
                });
            } else {
                res.status(500).send({
                    message: 'err'
                });
            }
        } else {
            res.send(data);
        }
    });

}