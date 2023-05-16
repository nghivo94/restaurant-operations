import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer'
import staffReducer from './reducers/staffReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        staff: staffReducer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
)