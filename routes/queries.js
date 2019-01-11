var promise = require('bluebird');
require('dotenv').config()

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

console.log(process.env.DATABASE_URL)

function signIn(req, res, next) {
  db.one('select * from users where email=${email} and password=${password}', req.body)
  .then(function (data) {
  res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE User'
    });
  })
  .catch(function (err) {
    return next(err);
  });
}

function createUser(req, res, next) {
  req.body.email = req.body.email.toLowerCase();
  db.one('insert into users(name, password, email)' + 'values(${name}, ${password}, ${email}) returning id', req.body).then(function(data) {
    res.status(200).json({ status: 'success', message: "New user created", id: data.id});
  }).catch(function(err) {
    res.status(500).json({error: err.detail});
  })
}

function getAllPreBuiltAnimations(req, res, next) {
  db.any('select * from animations where user_id is null')
  .then(function(data) {
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved All Prebuilt Animations'
      });
    }).catch(function(err) {
      return next(err)
  });
}

function getAllMyAnimations(req, res, next) {
  var user_id = parseInt(req.params.user_id);
  db.any('select * from animations where user_id=$1', user_id)
  .then(function(data) {
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved All Prebuilt Animations'
      });
    }).catch(function(err) {
      return next(err)
  });
}

function addAnimation(req, res, next) {
  db.one('insert into animations(user_id, ani_name, properties, keyframes)' +
  'values(${user_id}, ${ani_name}, ${properties}, ${keyframes}) returning id', req.body)
  .then(function(data) {
    res.status(200).json({ status: 'success', message: "Animation Was Added", id: data.id});
  }).catch(function(err) {
    next(err);
  })
}

function editAnimation(req, res, next) {
  var user_id = parseInt(req.params.user_id)
  var animation_id = parseInt(req.params.animation_id)
  db.tx(t => {
    return t.batch([
      t.none('update animations set ani_name = $3 where id = $1 and user_id = $2', [animation_id, user_id, req.body.ani_name]),
      t.none('update animations set properties = $3 where id = $1 and user_id = $2', [animation_id, user_id, req.body.properties]),
      t.none('update animations set keyframes = $3 where id = $1 and user_id = $2', [animation_id, user_id, req.body.keyframes])
    ]);
  })
    .then(function () {
      res.status(200)
        .json({
            'status': 'success',
            'message': 'Updated Animation'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteAnimation(req, res, next) {
  var animation_id = parseInt(req.params.animation_id);
  var user_id = parseInt(req.params.user_id);
  db.result('delete from animations where user_id = $1 and id = $2', [user_id, animation_id]).then(function(result) {
    res.status(200)
    .json({status: 'success', message: `${result.rowCount} row was deleted.`})
  })
  .catch(function(err) {
    return next(err);
  })
}


module.exports = {
  signIn: signIn,
  createUser: createUser,
  getAllPreBuiltAnimations: getAllPreBuiltAnimations,
  getAllMyAnimations: getAllMyAnimations,
  addAnimation: addAnimation,
  editAnimation: editAnimation,
  deleteAnimation: deleteAnimation,
};
