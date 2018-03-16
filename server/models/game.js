const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  type: { type: Number, enum: [0, 1, 2] },
  createdAt: { type: Date, default: Date.now },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
});

module.exports = mongoose.model('Game', GameSchema);
