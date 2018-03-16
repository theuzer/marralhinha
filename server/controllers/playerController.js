const mongoose = require('mongoose');

const Player = require('../models/player');
const Game = require('../models/game');

const getNewBall = number => ({
  inPlay: false,
  inMiddle: false,
  inStore: false,
  position: null,
  number
});

const getNewBalls = () => {
  const newBalls = [];
  for (let i = 0; i < 5; i++) {
    newBalls.push(getNewBall(i));
  }
  return newBalls;
};

const createPlayer = (req, res) => {
  const gameId = mongoose.Types.ObjectId(req.body.gameId.trim());

  const newPlayer = new Player();
  newPlayer.name = req.body.name;
  newPlayer.side = req.body.side;
  newPlayer.team = req.body.team;
  newPlayer.isAi = req.body.isAi;
  newPlayer.game = gameId;
  newPlayer.balls = getNewBalls();

  newPlayer.save((err) => {
    if (err) {
      res.send(err);
    }

    Game.findByIdAndUpdate(
      gameId,
      { $push: { players: newPlayer._id } },
      (innerErr) => {
        if (innerErr) {
          res.send(innerErr);
        }
      }
    );

    res.json(newPlayer);
  });
};

module.exports = {
  createPlayer,
};
