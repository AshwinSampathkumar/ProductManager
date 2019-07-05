import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import Api from "./Api";

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

// ReactDOM.render(<App api={Api} />, document.getElementById("root"));

ReactDOM.render(
    <Provider store={store}>
        <App api={Api} />
    </Provider>,
    document.getElementById('root')
);