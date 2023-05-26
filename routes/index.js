require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');


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

    const [users] = await promisePool.query("SELECT * FROM lgl23users WHERE name=?", username);
    console.log(users)
    if (users.length > 0) {

        bcrypt.compare(password, users[0].password, function (err, result) {
            // result == true logga in, annars buuuu 
            if (result) {
                console.log(users[0].id)
                req.session.userId = username;
                req.session.LoggedIn = true;
                nav.splice(2,3);
                nav.push({
                    url: "/profile",
                    title: "Profile"
                })
                return res.redirect('/profile');
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


module.exports = router;