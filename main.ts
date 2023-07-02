const React = require('react');
const express = require('express');
const app = express();
const ReactDomServer = require('react-dom/server');

app.get('/', (req, res) => {

    const renderStream = ReactDomServer.renderToPipeableStream(
        React.createElement('div', {}, 'Hello World'),
        {
            onShellReady: () => {
                res.statusCode = 200;
                renderStream.pipe(res);
            },
        }
    );
});

app.use(express.static('assets'));

app.listen(3000, () => {
    console.log('listening on port 3000');
});
