const React = require('react');

const HelloWorld = require('./components/HelloWorld.tsx');
const GlobalContext = require('src/contexts/GlobalContext.tsx');

module.exports = function Index() {

    const globalCtx = {
    };

    return <GlobalContext.Provider value={globalCtx}>
        <HelloWorld/>
    </GlobalContext.Provider>;
}
