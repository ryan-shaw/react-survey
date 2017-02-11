import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import localforage from 'localforage';

injectTapEventPlugin();

// const store = configureStore(JSON.parse(localStorage.getItem('state') || '{}'));

// store.subscribe(() => {
//     localStorage.setItem('state', JSON.stringify(store.getState()));
// });

// const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer>
          <Root  history={browserHistory} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NewRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NewRoot history={history} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
