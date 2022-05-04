const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const parser = require('body-parser');


var app = express();
var genuuid = require('uuid/v4');

let cors = require("cors");
app.use(cors());
app.use(cookieParser());
app.use(parser.urlencoded({extended: true}));

const oneDay = 1000 * 60 * 60 * 24;
app.use(
    session({
        key: "userId",
        secret: "this is a secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: oneDay,
        },
    })
);

const PORT = 5000;


app.use(
    session({
        name:'SessionCookie',
        genid: function(req) {
            console.log.log('session id generated');
            return genuuid();
        },
        secret: "Shsh!Secret!",
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false, maxAge: oneDay}
        })
);


app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));


var sqlconnection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "offenses"
    });
sqlconnection.connect((err) => {
    if (!err)
        console.log('DB Connected...');
    else
        console.log(err);
});


//<-----------------------------------------------Get all the reported crimes list-------------------------------------------------->
app.get('/reported_crime',(req,res)=>{
    sqlconnection.query('SELECT * FROM reported_crime r, users u where u.user_id = r.user_id',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//<-----------------------------------------------Get reported crimes list by id-------------------------------------------------->
app.get('/reported_crimes/:id', (req, res) => {
    sqlconnection.query('SELECT * FROM reported_crime WHERE reported_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//<-----------------------------------------------Add a report to litigation-------------------------------------------------->
app.post('/Authenticateinsert', (req, res) => {
    console.log(req);
    let auth = req.body.authenticate;
    console.log(auth);
    sqlconnection.query("insert into litigation(crime_type,crime_place,crime_time,crime_description,area_pin,police_id) values('"+auth.crime_type+"','"+auth.crime_place+"','"+auth.crime_time+"','"+auth.crime_time+"',"+auth.area_pin+","+auth.police_id+");", (err, rows, fields) => {
        if (!err)
            res.send('Inserted successfully');
        else
            console.log(err);
    })
});


// <-----------------------------------------------search user by id from login ------------------------------------------------!>
app.get('/suser/:id',(req,res)=>{
    sqlconnection.query('SELECT * FROM login WHERE login_id =? ',[req.params.id],(err,rows,fields)=>{
        if(!err)
        {
            // req.session.username = rows[0].login_id;
            // console.log(rows[0].login_id);
            res.send(rows);
        }
        else
            console.log(err);
    })
});


// <-----------------------------------------------Get all the withdraw request list for the logged in user------------------------------------------------!>
app.get('/withdraw_crime',(req,res)=>{
    sqlconnection.query('SELECT * FROM withdrawals WHERE reported_id IN(SELECT reported_id FROM reported_crime WHERE user_id IN (SELECT user_id FROM users WHERE ',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

