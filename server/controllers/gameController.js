const mongoose = require('mongoose');

const Game = require('../models/game');

const createGame = (req, res) => {
  const newGame = new Game();
  newGame.type = req.body.type;
  newGame.players = [];

  newGame.save((err) => {
    if (err) {
      res.send(err);
    }
    res.json(newGame);
  });
};

const getGame = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  Game.findById(id).exec()
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getGameWithPlayers = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  Game.findOne(id).populate('players').exec()
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateGame = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  const isFinished = req.body.isFinished;

  Game.findByIdAndUpdate(
    id,
    { isFinished },
    { upsert: true },
    (err) => {
      if (err) {
        res.send(err);
      }
      res.sendStatus(200);
    }
  );
};

module.exports = {
  createGame,
  getGame,
  getGameWithPlayers,
  updateGame
};
