const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist/fchef'));

app.get('/api', (req, res) => {
    let info = {
        id: 'empty',
        key: 'empty'
    };

    info.id = process.env.API_ID;
    info.key = process.env.API_KEY;

    res.status(200).send(info);
});

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/fchef/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);