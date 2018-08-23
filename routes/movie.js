const express = require('express');
const router = express.Router();
//models
const Movie = require('../models/Movie');

router.post('/', (req, res, next) => {
  //const data = req.body;  gelen isteğin body(vücutunu) aldık!
  
  const {title,category,Imdb_score,date,year,country} = req.body;
  
  //const movie = new Movie(req.body); bu kısa kullanımı

  const movie = new Movie({
    title: title,
    category: category,
    Imdb_score: Imdb_score,
    date: date,
    year: year,
    country: country
  });
  movie.save((err,data) => {
    if(err)
      res.json(err);

    res.json(data); 
    
  });

});

module.exports = router;
