const tmi = require('tmi.js');
const express = require('express');
const app = express();

const channelName = 'pokelawls';
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

app.listen(4000, () => console.log('Example app listening on port 4000!'));