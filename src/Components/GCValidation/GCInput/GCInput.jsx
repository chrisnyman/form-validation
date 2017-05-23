import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-input.css';

let errorMessage;

class GCInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.initialValue,
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

  validateEmail() {
    const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const valid = pattern.test(this.state.value);

    this.handleErrorMessage(valid, 'The email address you have entered is not valid');
    return valid;
  }

  validateName() {
    const pattern = new RegExp(/\d/);
    const valid = !pattern.test(this.state.value);
    if (this.state.value > this.props.minLength && this.state.value < this.props.maxLength) {
      console.log('Right length');
    }
    return valid;
  }

  validatePassword() {
    const valid = this.state.value.length > this.state.minLength;
    this.handleErrorMessage(valid, 'Password needs to have more than 8 characters');
    return valid;
  }

  validateDate() {
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
  validateInput(type) {
    let valid;

    if (this.state.value) {
      switch (type) {
        case 'email':
          valid = this.validateEmail();
          break;
        case 'password':
          valid = this.validatePassword();
          break;
        case 'name':
          valid = this.validateName();
          break;
        case 'date':
          valid = this.validateDate();
          break;
        case 'range':
          console.log(this.state.value);
          break;
        default:
          valid = true;
          break;
      }
    }

    this.setState({ isValid: valid });
  }

  handleErrorMessage(v, msg) {
    if (!v) {
      errorMessage = `${msg}`;
    }
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div className={`gc-input ${!this.state.isValid && 'gc-input--invalid'} ${this.props.extendedClass}`}>
        { /*this.props.type === "range" && (
          <div className="gc-input__range-num">
            <span className="gc-input__range-num--left">{this.props.min}</span>
            <span className="gc-input__range-num--right">{this.props.max}</span>
          </div>
        )*/}
        <input
          disabled={this.props.disabled}
          name={this.props.name}
          type={this.state.type}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onBlur={() => this.validateInput(this.props.type)}
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
  defaultValue: PropTypes.string
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
  sayHello: () => {
    console.log('hello');
  }
};

export default GCInput;
