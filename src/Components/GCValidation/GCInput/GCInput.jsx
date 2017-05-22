import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-input.css';

class GCInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.initialValue,
      type: 'text',
      maxLength: this.props.maxLength || 50,
      minLength: this.props.minLength || 0,
      isValid: undefined
    };
  }

  componentWillMount() {
    this.determineType(this.props.type);
  }

  determineType(type) {
    console.log(type);
    let foo;
    switch (type) {
      case 'name':
        foo = {type: 'text'};
        break;
      case 'email':
        foo = {type: 'email'};
        break;
      case 'password':
        foo = {
          type: 'password',
          minLength: 8
        };
        break;
      default:
        foo = {type: 'text'};
        break;
    }
    this.setState({ ...,
    foo });
  }

  validateEmail() {
    const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return pattern.test(this.state.value);
  }

  validateName() {
    const pattern = new RegExp(/\d/);
    return !pattern.test(this.state.value);
  }

  validatePassword() {
    return this.state.value.length > this.state.minLength;
  }

  // type string, email, numbers, address, date, date-range
  validateInput(type) {
    let valid;

    if (this.state.value) {

      if(this.state.value < this.state.maxLength && this.state.value > this.state.minLength) {
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
          default:
            valid = true;
            break;
        }
      }
    }

    this.setState({ isValid: valid });
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div className={`gc-input ${this.props.extendedClass}`}>
        <input
          disabled={this.props.disabled}
          name={this.props.name}
          type={this.state.type}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onBlur={() => this.validateInput(this.props.type)}
          onChange={e => this.handleChange(e.target.value)}
        />

        {this.state.isValid === false && (
          <p className="gc-input__error-msg">This is an error message</p>
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
  minLength: PropTypes.number
};

GCInput.defaultProps = {
  extendedClass: '',
  initialValue: '',
  disabled: false,
  name: '',
  placeholder: '',
  maxLength: 50,
  minLength: 0
};

export default GCInput;
