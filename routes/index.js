module.exports = (app) => {

    const user = require('../controller/user.controller');
    const todo = require('../controller/todo.controller');

    app.post('/register', user.register);
    app.post('/login', user.login);

    app.post('/todo', todo.insertTodo);
    app.post('/todos', todo.getAll);

    app.put('/todo', todo.updateDone);
    app.delete('/todo', todo.delete);
}