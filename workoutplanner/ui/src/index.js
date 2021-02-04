import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';

import WorkoutReducer from './store/reducers/workouts';
import UtilityReducer from './store/reducers/utils';
import AuthReducer from './store/reducers/auth';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  workout: WorkoutReducer,
  util: UtilityReducer,
  auth: AuthReducer,
})

const newStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={newStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
