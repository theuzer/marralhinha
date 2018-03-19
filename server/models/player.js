const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'Game' },
  cookie: String,
  team: { type: Number, enum: [0, 1] },
  side: { type: Number, enum: [0, 1, 2, 3] },
  name: String,
  isAi: Boolean,
  balls: [{
    number: { type: Number, enum: [0, 1, 2, 3, 4] },
    inPlay: Boolean,
    inMiddle: Boolean,
    inStore: Boolean,
    position: Number,
  }],
});

module.exports = mongoose.model('Player', PlayerSchema);
