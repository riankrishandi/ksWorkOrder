import React from 'react';
import { Provider } from 'react-redux';

import CounterApp from './src/CounterApp';
import store from './src/store/index';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <CounterApp />
            </Provider>
        );
    }
}

export default App;