import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-input.css';

let errorMessage;

class GCInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      type: 'text',
      isValid: undefined,
      errorMessage: '',
    };
  }

  componentWillMount() {
    this.determineType(this.props.type);
  }

  determineType(type) {
    let foo;
    switch (type) {
      case 'name':
        foo = 'text';
        break;
      case 'email':
        foo = 'email';
        break;
      case 'password':
        foo = 'password';
        break;
      case 'date':
        foo = 'date';
        break;
      case 'range':
        foo = 'range';
        break;
      default:
        foo = 'text';
        break;
    }
    this.setState({ type: foo });
  }

  static validateEmail(value) {
    const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const valid = pattern.test(value);

    this.handleErrorMessage(valid, 'The email address you have entered is not valid');
    return valid;
  }

  static validateName(value) {
    const pattern = new RegExp(/\d/);
    const valid = !pattern.test(value);
    if (this.state.value > this.props.minLength && value < this.props.maxLength) {
      console.log('Right length');
    }
    return valid;
  }

  static validatePassword(value) {
    const valid = value.length > this.state.minLength;
    this.handleErrorMessage(valid, 'Password needs to have more than 8 characters');
    return valid;
  }

  static validateDate(value) {
    const min = new Date(this.props.minDate);
    const max = new Date(this.props.maxDate);
    const selectedDate = new Date(this.state.value);

    if (min <= selectedDate && max >= selectedDate) {
      return true;
    }
    errorMessage = `Please select a date between ${min.toDateString()} and ${max.toDateString()}`;

    return false;
  }

  // type string, email, numbers, address, date, date-range
  static validateInput({ type, value }) {
    let valid;

    if (value) {
      switch (type) {
        case 'email':
          valid = this.validateEmail(value);
          break;
        case 'password':
          valid = this.validatePassword(value);
          break;
        case 'name':
          valid = this.validateName(value);
          break;
        case 'date':
          valid = this.validateDate(value);
          break;
        case 'range':
          console.log(value);
          break;
        default:
          valid = true;
          break;
      }

      return valid;
    }

    return valid;
    this.setState({ isValid: valid });
  }

  handleErrorMessage(v, msg) {
    if (!v) {
      errorMessage = `${msg}`;
    }
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  render() {
    return (
      <div className={`gc-input ${!this.state.isValid && 'gc-input--invalid'} ${this.props.extendedClass}`}>
        <input
          disabled={this.props.disabled}
          name={this.props.name}
          type={this.state.type}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onBlur={GCInput.validateInput(this.props.type, this.props.value)}
          onChange={e => this.handleChange(e.target.value)}
          min={this.props.min}
          max={this.props.max}
          defaultValue={this.props.defaultValue}
        />

        {this.state.isValid === false && (
          <p className="gc-input__error-msg">{errorMessage}</p>
        )}
      </div>
    );
  }
}

GCInput.propTypes = {
  extendedClass: PropTypes.string,
  initialValue: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.boolean,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  max: PropTypes.string,
  min: PropTypes.string,
  defaultValue: PropTypes.string,
  // touchedByParent: PropTypes.boolean,
  // sayHello: PropTypes.func,
};

GCInput.defaultProps = {
  extendedClass: '',
  initialValue: '',
  disabled: false,
  name: '',
  placeholder: '',
  maxLength: 50,
  minLength: 0,
  maxDate: null,
  minDate: null,
  max: null,
  min: null,
  defaultValue: null,
  // touchedByParent: false,
  // sayHello: () => {
  //   this.validateInput(this.props.type);
  //   console.log(this.state.isvalid);
  // }
};


export default GCInput;
