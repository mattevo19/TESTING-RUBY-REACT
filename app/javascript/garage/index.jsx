import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';

import CarsIndex from './containers/cars_index';
import CarsShow from './containers/cars_show';
import CarsNew from './containers/cars_new';

import carsReducer from './reducers/carsReducer';

const garageName = 'mattsgarage'
const initialState = {
  // garage: prompt('Garage Name') || `garage${Math.floor(10 +(Math.random()*99))}`,
  garage: garageName,
  cars: [
    // { id: 1, brand: 'Peugeot', model: '106', owner: 'John', plate: 'WOB-ED-42' },
    // { id: 2, brand: 'Renault', model: 'Scenic', owner: 'Paul', plate: 'AAA-12-BC' },
    // { id: 3, brand: 'Aston Martin', model: 'DB Mark III', owner: 'James', plate: '418-ED-94' },
    // { id: 4, brand: 'VW', model: 'Beetle', owner: 'George', plate: '1234-XD-75' },
    // { id: 5, brand: 'BMW', model: 'M5', owner: 'Matt', plate: 'MATT19' }
  ]
}

const reducers = combineReducers({
  // key: reducer
  // garage is here to make garage available in the state
  garage: ( state = null, action) => state,
  cars: carsReducer,
  // redux-form
  form: formReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={history}>
      <div className="view-container">
        <Switch>
          {/* different routes new has to go before :id because :id could be new (not in this case) */}
          <Route path='/' exact component={CarsIndex} />
          <Route path='/cars/new' exact component={CarsNew}/>
          <Route path='/cars/:id' component={CarsShow} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('container')
);
