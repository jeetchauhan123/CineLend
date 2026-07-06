const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const genres = require('./data/genres.js');
const movies = require('./data/movies.js');
// const con=mongoose.

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // your frontend's port
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.get('/getgenres',(req,res)=>{
    res.send(genres);
});

app.get('/getmovie',(req,res)=>{
    res.send(movies);
})

app.listen(3000,()=>{
    console.log('server running');
});