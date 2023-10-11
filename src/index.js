import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore} from 'redux';
import {  Provider  } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import dataReducer from './store/reducers/data'
import {legacy_createStore ,combineReducers ,applyMiddleware}  from 'redux'


const rootReducer = combineReducers({
  data : dataReducer,
})
const store = legacy_createStore(rootReducer,applyMiddleware(ReduxThunk))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
