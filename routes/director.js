var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Models
const Director = require('../models/Director');

/* GET home page. */
router.post('/', function (req, res, next) {
  const director = new Director(req.body);
  const promise = director.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/', function (req, res, next) {

  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'directorId',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })

});

router.get('/:directorId', function (req, res, next) {

  const promise = Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.directorId)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'directorId',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })

})

router.put('/:directorId', (req, resp, next) => {
  const promise = Director.findByIdAndUpdate(req.params.directorId, req.body, { new: true });

  promise.then((director) => {
    if (!director) {
      next({ message: 'The director was not found!', code: 99 });
    }
    resp.json(director);
  }).catch((err) => {
    resp.json(err);
  });

})

router.delete('/:directorId', (req, resp, next) => {
  const promise = Director.findByIdAndRemove(req.params.directorId);

  promise.then((director) => {
    if (!director) {
      next({ message: 'The director was not found!', code: 99 });
    }
    resp.json(director);
  }).catch((err) => {
    resp.json(err);
  });

})

module.exports = router;
