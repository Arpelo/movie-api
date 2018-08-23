const express = require('express');
const router = express.Router();
//models
const Movie = require('../models/Movie');

router.get('/', (req,res) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.end(err);
  });
});

// top 10 list

router.get('/top10', (req,res) => {
  const promise = Movie.find({}).limit(10).sort({ Imdb_score: -1});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.end(err);
  });
});


router.put('/:movie_id',(req,res,next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new: true}); // req.params.movie_id ile body'deki nesenleri güncelledik. (new) ile ilk bastırmada gösterdik.
  
  promise.then((data) => {
    if(!data)
      next({message: 'data isn\'t the find!', code: 5 });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id',(req,res,next) => {
  let promise = Movie.findById(req.params.movie_id); // req.params nesnesinin içinde düşüyor (:movie_id) değer!
  
  promise.then((data) => {
    if(!data)
      next({message: 'data isn\'t the find!', code: 5 });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:movie_id',(req,res,next) => {
  let promise = Movie.findByIdAndRemove(req.params.movie_id); // req.params nesnesinin içinde düşüyor (:movie_id) değer!
  
  promise.then((data) => {
    if(!data)
      next({message: 'data isn\'t the find!', code: 5 });
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

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

// between

router.get('/between/:start_year/:end_year', (req,res) => {
  const { start_year , end_year} = req.params;
  const promise = Movie.find(
    {
      year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year) } // string gelen ifadeyi int çevirmek için parseInt() kullandık.
    } // $gte: büyük eşitse $lte: küçük eşitse!
  
  );
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.end(err);
  });
});



module.exports = router;
