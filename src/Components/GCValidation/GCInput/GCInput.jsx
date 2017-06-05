import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-input.css';

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

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value || nextState.isValid !== this.state.isValid;
  }

  determineType(type) {
    let foo;
    switch (type) {
      case 'name':
        foo = 'text';
        break;
      case 'text':
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
    const pattern = self.handleRegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const valid = pattern.test(value);
    self.handleErrorMessage(valid, 'The email address you have entered is not valid');
    return valid;
  }

  static validateName(value, self) {
    const pattern = self.handleRegExp(/\d/);
    let valid;
    if (value.length > self.props.minLength && value.length < self.props.maxLength) {
      valid = pattern.test(value);
      if (!self.props.customRegex) {
        valid = !valid;
      }
    } else {
      valid = false;
      self.handleErrorMessage(valid, 'not right length');
    }
    return valid;
  }

  static validatePassword(value, self) {
    const valid = value.length < self.props.minLength;
    self.handleErrorMessage(valid, 'Password needs to have more than 8 characters');
    return valid;
  }

  static validateDate(value, self) {
    const min = new Date(self.props.minDate);
    const max = new Date(self.props.maxDate);
    const selectedDate = new Date(value);

    if (min <= selectedDate && max >= selectedDate) {
      return true;
    }
    self.setState({ errorMessage: `Please select a date between ${min.toDateString()} and ${max.toDateString()}` });

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
        case 'text':
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

      return valid;
    }
    self.setState({isValid: valid})
    return valid;
  }

  // handleValidity(v) {
  //   this.setState({ isValid: v });
  // }

  handleErrorMessage(v, msg) {
    if (!v) {
      this.setState({ errorMessage: `${msg}` });
    }
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  handleRegExp(regX) {
    if (this.props.customRegex) {
      return new RegExp(this.props.customRegex);
    }
    return new RegExp(regX);
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
          <p className="gc-input__error-msg">{self.state.errorMessage}</p>
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
  customRegex: PropTypes.any,
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
