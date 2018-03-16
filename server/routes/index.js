const express = require('express');

const playerController = require('../controllers/playerController');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/game', gameController.createGame);
router.get('/game/:id', gameController.getGame);
router.get('/game/:id/all', gameController.getGameWithPlayers);

router.post('/player', playerController.createPlayer);

module.exports = router;
