const path = require('path');
const db = require('../models');

module.exports = function (app) {

    app.get('/api/allscores', async (req, res) => {
        const dbAllScores = await db.Highscore.find({}).populate({ path: 'highscores' });
        res.json(dbAllScores);
    });

    app.post('/api/allscores', async (req, res) => {
        const dbAllScores = await db.Highscore.create(req.body);
        console.log(dbAllScores);
        res.json(dbAllScores);
    });

    app.put('/api/allscores/:name/:score', async (req, res) => {
        // //console.log(req.params.id, req.body);
        res.json(createHighscore());
    
        async function createHighscore() {
          const { _score } = await db.Highscore.create(req.body);
          return addToAllScores(_score);
        }
    
        async function addToScores(score) {
          const dbAllScores = await db.Highscore.findByIdAndUpdate(
            req.params,
            { $push: { highscore: score } },
            { new: true }
          );
          return dbAllScores;
        }
      });






}