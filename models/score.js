const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HighscoreSchema = new Schema({
  name: String,
  score: Number,
});

const Highscore = mongoose.model('Highscore', HighscoreSchema);

module.exports = Highscore;