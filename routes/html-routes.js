const path = require('path');

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/end', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/end.html'));
    });

    app.get('/highscores', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/highscores.html'));
    });

    app.get('/allHighscores', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/allHighscores.html'));
    });

    app.get('/game', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/game.html'));
    });
};