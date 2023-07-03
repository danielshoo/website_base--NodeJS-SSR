const React = require('react');

const Index = require('./Index.tsx');

module.exports = function IndexHtmlWrapped() {

    return <html className={'html'} lang="en">
    <head>
        <title>Placeholder Title</title>
        <meta charSet="UTF-8"/>
        <meta name={'viewport'} content={'width=device-width, initial-scale=1'}/>
        <script type={'text/javascript'} defer={true} src="/react-pages/main.js"></script>
        <link rel="stylesheet" href="/react-pages/main.css"/>
    </head>
    <body>
    <div id="root" className={'dsr-index'}>
        <Index></Index>
    </div>
    </body>
    </html>;
}
