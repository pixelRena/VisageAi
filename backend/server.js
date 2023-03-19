const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

dotenv.config();
const db = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: {
    	rejectUnauthorized: false
    }
  }
});

const buildPath = path.join(__dirname, '../frontend/build');

const app = express();

app.use(cors());
app.use(express.static(buildPath));
app.use(express.json());

// signin - POST
app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})

// register - POST users info to database
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// edit profile - update profile
app.post('/profile/:id', (req,res) => {profile.handleUpdate(req, res, db, bcrypt)})

// delete - delete account permanently
app.delete('/profile/:id', (req,res) => {profile.handleDeleteAccount(req, res, db, bcrypt)})

// image upload - PUT update profile with object
app.put('/image', (req,res) => {image.handleEntries(req, res, db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req, res, process.env.CLARIFAIAPI)})

app.get('*', (req,res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
})


app.listen(process.env.PORT, () => {
	console.log('Server listening...')
})
