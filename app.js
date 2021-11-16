const tmi = require('tmi.js');
const express = require('express');
const app = express();
const port = 4000;

var channelName = 'pokelawls';
var content = {};

const client = new tmi.Client({
    channels: [channelName]
});

client.connect();
client.on('message', (channel, tags, message, self) => {
    content = {
        message: `${tags['display-name']}: ${message}`,
        id: `${tags.id}`
    };
});

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    var content = {
        channelName: channelName
    }
    res.render('index', content);
});

app.get('/messages', (req, res) => {
    res.json(content);
});

app.listen(port, () => console.log(`Twitch relay web app, listening at port ${port}`));