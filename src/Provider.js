// Modules
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import rootReducers from './redux/rootReducer';

// Router
import { BrowserRouter as Router } from 'react-router-dom';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducers, {}, composeEnhancers());

export default class extends Component {
    render() {
        const { props: { children } } = this;
        return (
            <Provider store={store}>
              <Router>
                  {children}
              </Router>
            </Provider>
        )
    }
}