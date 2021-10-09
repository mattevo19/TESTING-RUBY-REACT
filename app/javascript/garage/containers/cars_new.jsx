import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import Aside from '../components/aside';
import { postCar } from '../actions';

class CarsNew extends Component {
  // called when form is submitted
  // redirects with a callback funtion using history
  onSubmit = (values) => {
    this.props.postCar(this.props.garage, values, () => {
      this.props.history.push('/');
    });
  }
  // from redux form documentation
  // called by each component in the form
  renderField = ({ input, placeholder, label, type, meta: { touched, error } }) => (
    <div className="form-group">
      <label>{label}</label>
        <input {...input} placeholder={placeholder} type={type} className="form-control"/>
        {touched && (error && <span className="red">{error}</span>)}
    </div>
  )
  // validation - if value isnt present it shows an required error below
  required = (value) => value ? undefined : 'Required';

  render () {
    return [
      <Aside key="aside" garage={this.props.garage}>
        <Link to="/">Back to list</Link>
      </Aside>,
      <div key="add" className="form-container">
        <div className="overlay"></div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

          <Field name="brand" type="text"
          label="Brand" placeholder="Aston Martin"
          component={this.renderField} 
          validate={[this.required]} />

          <Field name="model" type="text"
          label="Model" placeholder="DB Mark III" 
          component={this.renderField} 
          validate={[this.required]} />
         
          <Field name="owner" type="text" 
          label="Owner" placeholder="James Bond" 
          component={this.renderField} 
          validate={[this.required]} />
      
          <Field name="plate" type="text" 
          label="Plate" placeholder="DB Mark III" 
          component={this.renderField} 
          validate={[this.required]} />
  
          <button type="submit">Add car</button>
        </form>
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage
  };
}
// redux from connection
// {form: 'newPostForm'} has to be unique
export default reduxForm({ form: 'newPostForm' })(
  connect(mapStateToProps, { postCar })(CarsNew)
)