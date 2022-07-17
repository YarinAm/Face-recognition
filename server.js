const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '951753',
    database : 'postgres'
  }
});

const app = express();
app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!


app.post('/signin', (req, res) => { signin.handelSignIn(req , res, bcrypt, db)})

app.post('/register', (req, res) => {register.handelRegister(req , res , db , bcrypt)})

app.get('/profile/:id',(req, res)=> {profile.handelProfile(req,res,db)})

app.put('/image',(req, res) => {image.handelImage(req,res,db)})

app.post('/imageurl',(req, res) => {image.handelApiCall(req,res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
