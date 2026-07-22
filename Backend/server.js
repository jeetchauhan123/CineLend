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


const MoviePageData= {
  "_id": {
    "$oid": "573a13c3f29313caabd6ae04"
  },
  "fullplot": "Barney Ross leads the \"Expendables\", a band of highly skilled mercenaries including knife enthusiast Lee Christmas, martial arts expert Yin Yang, heavy weapons specialist Hale Caesar, demolitionist Toll Road and loose-cannon sniper Gunner Jensen. When the group is commissioned by the mysterious Mr. Church to assassinate the merciless dictator of a small South American island, Barney and Lee head to the remote locale to scout out their opposition. Once there, they meet with local rebel Sandra and discover the true nature of the conflict engulfing the city. When they escape the island and Sandra stays behind, Ross must choose to either walk away and save his own life - or attempt a suicidal rescue mission that might just save his soul.",
  "imdb": {
    "rating": 6.5,
    "votes": 248398,
    "id": 1320253
  },
  "year": 2010,
  "plot": "A CIA operative hires a team of mercenaries to eliminate a Latin dictator and a renegade CIA agent.",
  "genres": [
    "Action",
    "Adventure",
    "Thriller"
  ],
  "rated": "R",
  "metacritic": 45,
  "title": "The Expendables",
  "lastupdated": "2015-09-10 17:23:44.970000000",
  "languages": [
    "English",
    "Spanish"
  ],
  "writers": [
    "Dave Callaham (screenplay)",
    "Sylvester Stallone (screenplay)",
    "Dave Callaham (story)"
  ],
  "type": "movie",
  "tomatoes": {
    "website": "http://expendablesthemovie.com/",
    "viewer": {
      "rating": 3.6,
      "numReviews": 296436,
      "meter": 64
    },
    "dvd": {
      "$date": "2010-11-23T00:00:00.000Z"
    },
    "critic": {
      "rating": 5.2,
      "numReviews": 198,
      "meter": 41
    },
    "boxOffice": "$103.0M",
    "consensus": "It makes good on the old-school action it promises, but given all the talent on display, The Expendables should hit harder.",
    "rotten": 116,
    "production": "Lionsgate Films",
    "lastUpdated": {
      "$date": "2015-09-10T17:23:46.000Z"
    },
    "fresh": 82
  },
  "poster": "https://m.media-amazon.com/images/M/MV5BNTUwODQyNjM0NF5BMl5BanBnXkFtZTcwNDMwMTU1Mw@@._V1_SY1000_SX677_AL_.jpg",
  "num_mflix_comments": 0,
  "released": {
    "$date": "2010-08-13T00:00:00.000Z"
  },
  "awards": {
    "wins": 3,
    "nominations": 5,
    "text": "3 wins & 5 nominations."
  },
  "countries": [
    "USA"
  ],
  "cast": [
    "Sylvester Stallone",
    "Jason Statham",
    "Jet Li",
    "Dolph Lundgren"
  ],
  "directors": [
    "Sylvester Stallone"
  ],
  "runtime": 103
}


app.get('/getgenres',(req,res)=>{
    res.send(genres);
});

app.get('/getmovie',(req,res)=>{
    res.send(movies);
});

app.get('/moviepage',(req,res)=>{
  setTimeout(() => {
    res.send(MoviePageData);
  }, 1000);  
})

app.listen(3000,()=>{
    console.log('server running');
});