const sql = require('./db');

const Todo = function(todo) {
    this.todo_id = todo.todo_id;
    this.user_id = todo.user_id;
    this.todo_item = todo.todo_item;
    this.done_flg = todo.done_flg;
    this.created_date = todo.created_date;
}

Todo.create = (newTodo, result) => {
    sql.query("INSERT INTO todo SET ?", newTodo, (err, res) => {
        if (err) {
            console.log(`[ERROR] : ${err}`);
            result(err, null);
            return;
        }

        console.log(`[SUCCESS] created todo :`, {
            id: res.insertId,
            ...newTodo
        });
        result(null, {
            id: res.insertId,
            ...newTodo
        });
    })
}


Todo.getAll = (user_id, result) => {
    sql.query(`SELECT * FROM todo WHERE user_id = ${user_id}`, (err, res) => {
        if (err) {
            console.log(`[ERROR] : ${err}`);
            result(err, null);
            return;
        }

        console.log("[SUCCESS] found TODOLIST : ", res[0]);
        result(null, res);
        return;
    })
}

Todo.updateByTodoId = (todo_id, result) => {
    sql.query(`UPDATE todo SET done_flg = 1 WHERE todo_id = ${todo_id}`, (err, res) => {
        if (err) {
            console.log(`[ERROR] : ${err}`);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({
                kind: "not_found"
            }, null);
            return;
        }

        console.log("updated todo: ", todo_id);
        result(null, todo_id);
    })

}

Todo.delete = (todo_id, result) => {
    sql.query(`DELETE FROM todo WHERE todo_id = ${todo_id}`, (err, res) => {
        if (err) {
            console.log(`[ERROR] : ${err}`);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({
                kind: "not_found"
            }, null);
            return;
        }

        console.log("delete todo: ", todo_id);
        result(null, todo_id);
    })
}

module.exports = Todo;