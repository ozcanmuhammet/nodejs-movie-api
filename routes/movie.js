var express = require('express');
var router = express.Router();

const Movie = require('../models/Movie');

router.get('/', (req, resp) => {

  const promise = Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'directorId',
        foreignField: '_id',
        as: 'director'
      }
    },
    {
      $unwind: '$director'
    }
  ])

  //const promise = Movie.find({});

  promise.then((data) => {
    resp.json(data);
  }).catch((err) => {
    resp.json(err);
  });
});

router.get('/top10', (req, resp) => {
  const promise = Movie.find({}).limit(10).sort({ imdbScore: -1 });

  promise.then((data) => {
    resp.json(data);
  }).catch((err) => {
    resp.json(err);
  });
});


router.get('/:movieId', (req, resp, next) => {
  const promise = Movie.findById(req.params.movieId);

  promise.then((movie) => {
    if (!movie) {
      next({ message: 'The movie was not found!', code: 99 });
    }
    resp.json(movie);
  }).catch((err) => {
    resp.json(err);
  });

})

router.put('/:movieId', (req, resp, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true });

  promise.then((movie) => {
    if (!movie) {
      next({ message: 'The movie was not found!', code: 99 });
    }
    resp.json(movie);
  }).catch((err) => {
    resp.json(err);
  });

})

router.delete('/:movieId', (req, resp, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movieId);

  promise.then((movie) => {
    if (!movie) {
      next({ message: 'The movie was not found!', code: 99 });
    }
    resp.json({ status: 1 });
  }).catch((err) => {
    resp.json(err);
  });

})

router.get('/between/:startYear/:endYear', (req, resp) => {
  const { startYear, endYear } = req.params;
  const promise = Movie.find({
    year: { '$gte': parseInt(startYear), '$lte': parseInt(endYear) }
  });

  promise.then((data) => {
    resp.json(data);
  }).catch((err) => {
    resp.json(err);
  });
});


router.post('/', (req, resp, next) => {
  /*
  const { title, imdbScore, category, country, year } = req.body;

  const movie = new Movie({
    title: title,
    imdbScore: imdbScore,
    category: category,
    country: country,
    year: year
  });
  */

  const movie = new Movie(req.body);
  /*
    movie.save((err, data) => {
      if (err)
        res.json(err);

      res.json(data);

    });
  */

  // movie.save with promise
  const promise = movie.save();
  promise.then((data) => {
    resp.json(data);
  }).catch((err) => {
    resp.json(err);
  });

});

module.exports = router;
