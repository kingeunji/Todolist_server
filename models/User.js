const sql = require('./db');

const User = function(user) {
    this.user_id = user.user_id;
    this.email = user.email;
    this.password = user.password;
    this.username = user.username;
    this.created_date = user.created_date;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log(`[ERROR] : ${err}`);
            result(err, null);
            return;
        }

        console.log(`[SUCCESS] created user id :`, {
            id: res.insertId,
            ...newUser
        });
        result(null, {
            id: res.insertId,
            ...newUser
        });
    });
}

User.findByEmail = (email, result) => {

    sql.query(`SELECT * FROM user WHERE email = '${email}' `, (err, res) => {
        if (err) {
            console.log(`[ERROR] : ${err}`);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("[SUCCESS] found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found 
        result({
            kind: "not_found"
        }, null);

    });
}

module.exports = User;