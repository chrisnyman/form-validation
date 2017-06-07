import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-input.css';

class GCInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: 'text',
      hasBeenBlurred: false,
    };
  }

  componentWillMount() {
    this.determineType(this.props.type);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value || nextProps.submitPressed !== this.props.submitPressed || nextState.hasBeenBlurred !== this.state.hasBeenBlurred;
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

  static validateEmail(value, props) {
    const pattern = GCInput.handleRegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, props);
    const valid = pattern.test(value);
    return GCInput.handleErrorMessage(valid, props, 'The email address you have entered is not valid');
  }

  static validateName(value, props) {
    const pattern = GCInput.handleRegExp(/\d/, props);
    let valid;
    if (value.length > props.minLength && value.length < props.maxLength) {
      valid = pattern.test(value);
      if (!props.customRegex) {
        valid = !valid;
      }
      return GCInput.handleErrorMessage(valid, props);
    } else {
      return GCInput.handleErrorMessage(valid, props, 'Not right length');
    }
  }

  static validatePassword(value, props) {
    const min = props.minLength !== 0 ? props.minLength : 8;
    return GCInput.handleErrorMessage(value.length > min, props, `Password needs to have more than ${min} characters`);
  }

  static validateDate(value, props) {
    const min = new Date(props.minDate);
    const max = new Date(props.maxDate);
    const selectedDate = new Date(value);
    return GCInput.handleErrorMessage(min >= selectedDate && max <= selectedDate, props, `Please select a date between ${min.toDateString()} and ${max.toDateString()}`);
  }

  static validateInput(props) {
    let error = null;
    if (props.value) {
      switch (props.type) {
        case 'email':
          error = GCInput.validateEmail(props.value, props);
          break;
        case 'password':
          error = GCInput.validatePassword(props.value, props);
          break;
        case 'name':
        case 'text':
          error = GCInput.validateName(props.value, props);
          break;
        case 'date':
          error = GCInput.validateDate(props.value, props);
          break;
        case 'range':
        default:
          error = null;
          break;
      }
    } else if (props.required) {
      error = 'This field is required';
    }

    return error;
  }

  static handleErrorMessage(v, props, msg = 'Invalid Input') {
    if (!v) {
      return props.customErrorMessage || msg;
    }
    return null;
  }

  static handleRegExp(regX, props) {
    if (props.customRegex) {
      return new RegExp(props.customRegex);
    }
    return new RegExp(regX);
  }

  showValidationError() {
    return (this.state.hasBeenBlurred && GCInput.validateInput(this.props)) || (this.props.submitPressed && GCInput.validateInput(this.props));
  }

  handleChange(e) {
    const isValid = GCInput.validateInput(this.props) === null;
    this.props.onChange(e.target.value, isValid);
  }

  render() {
    // const instance = this;
    return (
      <div className={`gc-input ${!this.state.isValid && 'gc-input--invalid'} ${this.props.extendedClass}`}>
        <input
          disabled={this.props.disabled}
          name={this.props.name}
          type={this.state.type}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onBlur={() => this.setState({ hasBeenBlurred: true })}
          onChange={e => this.handleChange(e)}
          min={this.props.min}
          max={this.props.max}
        />

        {this.showValidationError() && (
          <p className="gc-input__error-msg">
            {GCInput.validateInput(this.props)}</p>
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
  touchedByParent: PropTypes.func,
  submitPressed: PropTypes.bool,
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
  submitPressed: false,
};

export default GCInput;
