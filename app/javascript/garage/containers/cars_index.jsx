import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getCars } from '../actions';

import Aside from '../components/aside';

class CarsIndex extends Component {
  // loads cars from garage
  componentDidMount() {
    this.props.getCars(this.props.garage)
  }

  renderCars() {
    return this.props.cars.map((car) => {
      return (
        <div key={car.id} className="car-smallad">
          <Link to={`/cars/${car.id}`} key={car.id} />
          <div className="car-details">
            <span>{car.brand} - {car.model}</span>
            <ul>
              <li><strong>Owner:</strong> {car.owner}</li>
            </ul>
            <span className="plate">{car.plate}</span>
          </div>
        </div>
      )
    })
  }
  
  render() {
    if (this.props.cars.length === 0) {
      return [
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/cars/new">Add a car</Link>
        </Aside>,
        <div className="no-car" key="nocar">No car yet</div>
      ];
    }
    
    return [
      <Aside key="aside" garage={this.props.garage}>
          <Link to="/cars/new">Add a car</Link>
      </Aside>,
      <div className='list-container' key='cars'>
        {this.renderCars()}
      </div>
    ];
  }
}

// gets cars and garage from redux state
function mapStateToProps(state) {
  return {
    cars: state.cars,
    garage: state.garage
  }
}

// gets getCars from actions
function mapDipatchToProps(dispatch) {
  return bindActionCreators(
    { getCars },
    dispatch
  )
}

export default connect(mapStateToProps,mapDipatchToProps)(CarsIndex);