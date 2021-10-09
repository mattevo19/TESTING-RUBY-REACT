import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getSingleCar, removeCar } from '../actions';
import Aside from '../components/aside';

class CarsShow extends Component {
  // used for delete
  // history used for a direct to the show page after clicked
  handleClick = () => {
    this.props.removeCar(this.props.history, this.props.car);
  }
  // used to get car when page is refreshed
  // this.props.match.params.id comes from the url
  componentDidMount() {
    if (!this.props.car) {
      this.props.getSingleCar(this.props.match.params.id)
    }
  }

  render() {
    if (!this.props.car) {
      return (
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/">Back to list</Link>
        </Aside>
      )
    }

    return [
      <Aside key="aside" garage={this.props.garage}>
        <Link to="/">Back to list</Link>
      </Aside>,
      <div className="car-container" key="car">
        <div className="car-card">
          <div className="car-details">
            <span>{this.props.car.brand} - {this.props.car.model}</span>
            <ul>
              <li><strong>Owner:</strong> {this.props.car.owner}</li>
            </ul>
            <span className="plate">{this.props.car.plate}</span>
          </div>
          <button className="delete" onClick={this.handleClick}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
            Delete
          </button>
        </div>
      </div>
    ]
  }
}

// gets the id from the url to find the car
function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id)
  return {
    car: state.cars.find(c=> c.id === idFromUrl)
  }
}

// gets getSingleCar , and removeCar from actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSingleCar, removeCar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsShow);