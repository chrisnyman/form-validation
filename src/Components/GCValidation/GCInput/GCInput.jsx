import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-input.css';

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

  static validateEmail(value, instance) {
    const pattern = instance.handleRegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const valid = pattern.test(value);
    instance.handleErrorMessage(valid, 'The email address you have entered is not valid');
    return valid;
  }

  static validateName(value, instance) {
    const pattern = instance.handleRegExp(/\d/);
    let valid;
    if (value.length > instance.props.minLength && value.length < instance.props.maxLength) {
      valid = pattern.test(value);
      if (!instance.props.customRegex) {
        valid = !valid;
      }
      instance.handleErrorMessage(valid);
    } else {
      valid = false;
      instance.handleErrorMessage(valid, 'Not right length');
    }
    return valid;
  }

  static validatePassword(value, instance) {
    const valid = value.length < instance.props.minLength;
    instance.handleErrorMessage(valid, 'Password needs to have more than 8 characters');
    return valid;
  }

  static validateDate(value, instance) {
    const min = new Date(instance.props.minDate);
    const max = new Date(instance.props.maxDate);
    const selectedDate = new Date(value);

    if (min <= selectedDate && max >= selectedDate) {
      return true;
    }
    instance.setState({ errorMessage: `Please select a date between ${min.toDateString()} and ${max.toDateString()}` });

    return false;
  }

  static validateInput(instance) {
    let valid;
    if (instance.props.value) {
      switch (instance.props.type) {
        case 'email':
          valid = GCInput.validateEmail(instance.props.value, instance);
          break;
        case 'password':
          valid = GCInput.validatePassword(instance.props.value, instance);
          break;
        case 'name':
        case 'text':
          valid = GCInput.validateName(instance.props.value, instance);
          break;
        case 'date':
          valid = GCInput.validateDate(instance.props.value, instance);
          break;
        case 'range':
        default:
          valid = true;
          break;
      }
      instance.setState({ isValid: valid });
      return valid;
    }
    instance.setState({ isValid: undefined });
    return valid;
  }

  handleErrorMessage(v, msg = 'Invalid Input') {
    if (!v) {
      this.setState({ errorMessage: this.props.customErrorMessage || msg });
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
    const instance = this;
    return (
      <div className={`gc-input ${!this.state.isValid && 'gc-input--invalid'} ${this.props.extendedClass}`}>
        <input
          disabled={this.props.disabled}
          name={this.props.name}
          type={this.state.type}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onBlur={() => GCInput.validateInput(instance)}
          onChange={e => this.handleChange(e.target.value)}
          min={this.props.min}
          max={this.props.max}
        />

        {instance.state.isValid === false && (
          <p className="gc-input__error-msg">{instance.state.errorMessage}</p>
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
  customRegex: PropTypes.object,
  customErrorMessage: PropTypes.string,
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
  customErrorMessage: null,
};

export default GCInput;
