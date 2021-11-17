const tmi = require('tmi.js');
const express = require('express');
const app = express();
const port = 4000;

var content = {};
var channelName;
var client;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    var currentChannel = {
        currentChannel: channelName
    }
    res.render('index', currentChannel);
});

app.get('/messages', (req, res) => {
    res.json(content);
});

app.post('/search', (req, res) => {
    if (client) {
        content = {};
        client.disconnect();
    }
    channelName = req.body.name;
    client = new tmi.Client({
        channels: [channelName]
    });
    client.connect();
    client.on('message', (channel, tags, message, self) => {
        content = {
            message: `${tags['display-name']}: ${message}`,
            id: `${tags.id}`
        };
    });
});

app.listen(port, () => console.log(`Twitch relay web app, listening at port ${port}`));