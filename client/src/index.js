import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import loadingReducer from './reducers/loadingReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer,
        loading: loadingReducer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
)