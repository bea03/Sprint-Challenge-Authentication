const router = require('express').Router();

const userModel = require('./usersModel.js');

router.get('/', (req, res) => {
    userModel.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => res.send(err));
});

module.exports = router;