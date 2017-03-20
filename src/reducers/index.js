import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


const reducers = {};

module.exports = combineReducers({
  ...reducers,
  routing: routerReducer,
});
