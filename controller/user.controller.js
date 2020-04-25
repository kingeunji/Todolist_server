const User = require('../models/User');

exports.register = (req, res) => {

    const {
        email,
        password,
        username
    } = req.body;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // create user 
    const newUser = new User({
        email,
        password,
        username
    });

    User.create(newUser, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "err"
            })
        } else {
            res.send(data);
        }
    });

}

exports.login = (req, res) => {

    const {
        email,
        password
    } = req.body;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    User.findByEmail(email, (err, data) => {
        if (err) {
            if (err.kind == 'not_found') {
                res.status(404).send({
                    message: `Not found User with Email ${req.params.email}.`
                });
            } else {
                res.status(500).send({
                    message: 'err'
                });
            }
        } else {
            if (password == data.password) {
                res.send(data);
            } else {
                res.status(500).send({
                    message: 'check your password'
                });
            }
        }
    })


}