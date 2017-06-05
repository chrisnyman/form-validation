import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-input.css';

let errorMessage;

class GCInput extends Component {
  constructor(props, context) {
    super(props, context);
    // console.log(props);
    this.props = props;
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

  static validateEmail(value, self) {
    const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const valid = pattern.test(value);
    self.handleErrorMessage(valid, 'The email address you have entered is not valid');
    return valid;
  }

  static validateName(value, self) {
    const pattern = new RegExp(/\d/);
    const valid = !pattern.test(value);
    // if (value > self.props.minLength && value < self.props.maxLength) {
    //   console.log('Right length');
    // }
    return valid;
  }

  static validatePassword(value) {
    const valid = value.length > this.props.minLength;
    this.handleErrorMessage(valid, 'Password needs to have more than 8 characters');
    return valid;
  }

  static validateDate(value) {
    const min = new Date(this.props.minDate);
    const max = new Date(this.props.maxDate);
    const selectedDate = new Date(this.props.value);

    if (min <= selectedDate && max >= selectedDate) {
      return true;
    }
    errorMessage = `Please select a date between ${min.toDateString()} and ${max.toDateString()}`;

    return false;
  }

  // type string, email, numbers, address, date, date-range
  static validateInput(self) {
    let valid;
    if (self.props.value) {
      switch (self.props.type) {
        case 'email':
          valid = GCInput.validateEmail(self.props.value, self);
          break;
        case 'password':
          valid = GCInput.validatePassword(self.props.value, self);
          break;
        case 'name':
          valid = GCInput.validateName(self.props.value, self);
          break;
        case 'date':
          valid = GCInput.validateDate(self.props.value, self);
          break;
        case 'range':
          console.log(self);
          break;
        default:
          valid = true;
          break;
      }

      self.setState({isValid: valid})
      return valid;
    }

    return valid;
  }

  // handleValidity(v) {
  //   this.setState({ isValid: v });
  // }

  handleErrorMessage(v, msg) {
    if (!v) {
      errorMessage = `${msg}`;
    }
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  render() {
    const self = this;
    return (
      <div className={`gc-input ${!this.state.isValid && 'gc-input--invalid'} ${this.props.extendedClass}`}>
        <input
          disabled={this.props.disabled}
          name={this.props.name}
          type={this.state.type}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onBlur={() => GCInput.validateInput(self)}
          onChange={e => this.handleChange(e.target.value)}
          min={this.props.min}
          max={this.props.max}
        />

        {self.state.isValid === false && (
          <p className="gc-input__error-msg">{errorMessage}</p>
        )}
      </div>
    );
  }
}

GCInput.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  max: PropTypes.string,
  min: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customRegex: PropTypes.string,
  // touchedByParent: PropTypes.boolean,
};

GCInput.defaultProps = {
  extendedClass: '',
  value: '',
  disabled: false,
  name: '',
  placeholder: '',
  maxLength: 50,
  minLength: 0,
  maxDate: null,
  minDate: null,
  max: null,
  min: null,
  customRegex: null,
};

export default GCInput;
