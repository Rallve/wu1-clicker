require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const validator = require('validator');
const pool = require('../utils/database.js');
const promisePool = pool.promise();

var loggedIn = false;

router.get('/', async function (req, res, next) {
    res.render('index.njk', {
    });
});

router.get('/login', function (req, res, next) {
    res.render('login.njk', { title: 'Login' }); 
});

router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    const errors = [];
    console.log('test');

    if (username === "") {
        console.log("Username is Required")
        errors.push("Username is Required")
        return res.json(errors)
    } else if (password === "") {
        console.log("Password is Required")
        errors.push("Password is Required")
        return res.json(errors)
    }

    
    if (errors.length === 0) {
        // sanitize title och body, tvätta datan
        const sanitize = (str) => {
            let temp = str.trim();
            temp = validator.stripLow(temp);
            temp = validator.escape(temp);
            return temp;
        };
        if (username) sanitizedUser = sanitize(username);
        if (password) sanitizedPass = sanitize(password);
    }

    const [users] = await promisePool.query("SELECT * FROM lgl23clickerPlayers WHERE name=?", username);
    console.log(users)
    if (users.length > 0) {

        bcrypt.compare(password, users[0].password, function (err, result) {
            // result == true logga in, annars buuuu 
            if (result) {
                

                req.session.userId = username;
                req.session.LoggedIn = true;
                return res.render("index.njk", {
                    
                })
                //return res.redirect('/');
            } else {
                errors.push("Invalid username or password")
                return res.json(errors)
            }
        });
    } else {
        errors.push("Wrong credentials")
        return res.json(errors)
    }
    // if username inte är i db : login fail!
});


router.get('/register', async function(req, res) {
    res.render('register.njk', { title: 'Register' })
});

router.post('/register', async function(req, res) {
    const { username, password, passwordConfirmation } = req.body;
    const errors = [];

    if (username === "") {
        console.log("Username is Required")
        errors.push("Username is Required")
        return res.json(errors)
    } else if (password === "") {
        console.log("Password is Required")
        errors.push("Password is Required")
        return res.json(errors)
    } else if(password !== passwordConfirmation ){
        console.log("Passwords do not match")
        errors.push("Passwords do not match")
        return res.json(errors)
    }

    const [users] = await promisePool.query("SELECT * FROM lgl23clickerPlayers WHERE name=?", username);
    console.log(users)

    if (users.length > 0) {
        console.log("Username is already taken")
        errors.push("Username is already taken")
        return res.json(errors)
    }

    await bcrypt.hash(password, 10, async function (err, hash) {

        console.log(hash);
        const [rows] = await promisePool.query('INSERT INTO lgl23clickerPlayers (name, password) VALUES (?, ?)', [username, hash])
        res.redirect('/login');

    });
});

router.get('/crypt/:pwd', async function (req, res, next) {
    const pwd = req.params.pwd;

    await bcrypt.hash(pwd, 10, function (err, hash) {

        console.log(hash);
        //return res.json(hash);
        return res.json({ hash });
    });

});

module.exports = router;