const express = require('express');

const playerController = require('../controllers/playerController');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/game', gameController.createGame);
router.get('/game/:id', gameController.getGame);
router.get('/game/:id/all', gameController.getGameWithPlayers);
router.put('/game/:id', gameController.updateGame);

router.post('/player', playerController.createPlayer);
router.get('/player/:id', playerController.getPlayer);
router.put('/player/:id', playerController.updatePlayerBall);

module.exports = router;
