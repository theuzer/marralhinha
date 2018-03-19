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
  newPlayer.cookie = req.body.cookie;
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

const updatePlayerBall = (req, res) => {
  const playerId = mongoose.Types.ObjectId(req.params.id.trim());
  const ballNumber = parseInt(req.body.ball.number, 10);
  const position = parseInt(req.body.ball.position, 10);
  const inPlay = req.body.ball.inPlay;
  const inMiddle = req.body.ball.inMiddle;
  const inStore = req.body.ball.inStore;

  Player.update(
    { _id: playerId, balls: { $elemMatch: { number: ballNumber } } },
    {
      $set: {
        'balls.$.inPlay': inPlay,
        'balls.$.inMiddle': inMiddle,
        'balls.$.inStore': inStore,
        'balls.$.position': position
      }
    },
    { upsert: true },
    (err) => {
      if (err) {
        res.send(err);
      }
      res.sendStatus(200);
    }
  );
};

const getPlayer = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id.trim());

  Player.findById(id).exec()
    .then((player) => {
      res.json(player);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  createPlayer,
  updatePlayerBall,
  getPlayer,
};
