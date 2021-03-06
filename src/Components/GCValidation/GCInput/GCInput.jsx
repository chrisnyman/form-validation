import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GCRadio from './GCRadio';
import GCCheckbox from './GCCheckbox';

import './gc-input.css';

class GCInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: 'text',
      validationMessage: null,
      touchedByParent: props.touchedByParent,
    };
  }

  componentWillMount() {
    this.determineType(this.props.type);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.touchedByParent && this.props.touchedByParent !== nextProps.touchedByParent) {
      this.setState({ touchedByParent: true }, () => {
        this.validateInput();
      });
    }
  }

  componentDidUpdate() {
    if (this.props.type === "checkbox" || this.props.type === "radio") {
      this.validateInput();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value || nextProps.touchedByParent !== this.props.touchedByParent || nextState.validationMessage !== this.state.validationMessage;
  }

  determineType(type) {
    let inputType;
    switch (type) {
      case 'name':
        inputType = 'text';
        break;
      case 'text':
      case 'url':
        inputType = 'text';
        break;
      case 'email':
        inputType = 'email';
        break;
      case 'checkbox':
        inputType = 'checkbox';
        break;
      case 'password':
        inputType = 'password';
        break;
      case 'date':
        inputType = 'date';
        break;
      case 'range':
        inputType = 'range';
        break;
      case 'number':
        inputType = 'number';
        break;
      case 'textarea':
        inputType = 'textarea';
        break;
      case 'radio':
        inputType = 'radio';
      default:
        inputType = 'text';
        break;
    }
    this.setState({ type: inputType });
  }

  validateEmail(value) {
    const pattern = this.handleRegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const valid = pattern.test(value);
    return this.handleErrorMessage(valid, 'The email address you have entered is not valid');
  }

  validateName(value) {
    const pattern = this.handleRegExp(/\d/);
    const maxL = this.props.maxLength;
    let valid;

    if ((maxL && value.length < maxL) || !maxL) {
      valid = pattern.test(value);
      if (!this.props.customRegex) {
        valid = !valid;
      }
      return this.handleErrorMessage(valid);
    } else {
      return this.handleErrorMessage(valid, `May not contain more than ${maxL} characters`);
    }
  }

  validateUrl(value) {
    let usableUrl = '';
    if ((/^(https:\/\/|http:\/\/)/).test(value)) {
      usableUrl = value;
    } else {
      usableUrl = 'https://' + value;
    }
    const valid = /[.]+/.test(usableUrl);
    return this.handleErrorMessage(valid, 'Url is not valid');
  }

  validateTextarea(value) {
    const pattern = this.handleRegExp('');
    const minL = this.props.minLength;
    const maxL = this.props.maxLength;
    let valid;
    if (minL && value.length < minL) {
      return this.handleErrorMessage(valid, `May not contain less than ${minL} characters`);
    } else if (maxL && value.length > maxL) {
      return this.handleErrorMessage(valid, `May not contain more than ${maxL} characters`);
    } else {
      valid = pattern.test(value);
      return this.handleErrorMessage(valid);
    }
  }

  validatePassword(value) {
    const min = this.props.minLength && this.props.minLength !== 0 ? this.props.minLength : 8;
    return this.handleErrorMessage(value.length > min, `Password needs to have more than ${min} characters`);
  }

  validateDate(value) {
    const min = new Date(this.props.minDate);
    const max = new Date(this.props.maxDate);
    const selectedDate = new Date(value);
    return this.handleErrorMessage(min >= selectedDate && max <= selectedDate, `Please select a date between ${min.toDateString()} and ${max.toDateString()}`);
  }

  validateNumber(value) {
    const min = this.props.min;
    const max = this.props.max;
    if (min && min > value) {
      return this.handleErrorMessage(false, `Number must be higher than ${min}.`);
    } else if (max && max < value) {
      return this.handleErrorMessage(false, `Number must be lower than ${max}`);
    }
  }

  validateCheckbox(value) {
    if (this.props.options.length > 0) {
      const minL = this.props.minLength;
      const maxL = this.props.maxLength;
      if (minL && minL > value.length) {
        return `Please select more than ${minL} options`;
      } else if (maxL && maxL < value.length) {
        return `Please select less than ${maxL} options`;
      }
    }
  }

  isEmpty(v) {
    return (typeof v === 'string' && v !== '') || (typeof v === 'object' && v.length > 0) || (typeof v === 'boolean' && v && this.props.required);
  }

  validateInput() {
    const props = this.props;
    let error = null;
    if (this.isEmpty(props.value)) {
      switch (props.type) {
        case 'email':
          error = this.validateEmail(props.value);
          break;
        case 'password':
          error = this.validatePassword(props.value);
          break;
        case 'name':
        case 'text':
          error = this.validateName(props.value);
          break;
        case 'date':
          error = this.validateDate(props.value);
          break;
        case 'number':
          error = this.validateNumber(props.value);
          break;
        case 'textarea':
          error = this.validateTextarea(props.value);
        case 'checkbox':
          error = this.validateCheckbox(props.value);
          break;
        case 'url':
          error = this.validateUrl(props.value);
          break;
        case 'range':
        default:
          error = null;
          break;
      }
    } else if (props.required) {
      error = 'This field is required';
    }

    if (this.state.touchedByParent) {
      this.props.sendResultsToForm(!error);
    }
    this.setState({
      validationMessage: error,
      touchedByParent: false
    });
  }

  handleErrorMessage(v, msg = 'Invalid Input') {
    if (!v) {
      return this.props.customErrorMessage || msg;
    }
    return null;
  }

  handleRegExp(regX) {
    if (this.props.customRegex) {
      return new RegExp(this.props.customRegex);
    }
    return new RegExp(regX);
  }

  handleChange(v) {
    if (!this.props.disabled) {
      this.props.onChange(v, this.props.stateName);
    }
  }

  renderInput() {
    const invalidClass = this.state.validationMessage ? 'gc-input--invalid' : '';
    const disabledClass = this.props.disabled ? 'gc-input--disabled' : '';
    if (this.props.type === 'textarea') {
      const textareaClass = `gc-input__textarea--${this.props.size}`;
      return (<textarea
        className={`${invalidClass} ${disabledClass} ${textareaClass}`}
        disabled={this.props.disabled}
        name={this.props.name}
        defaultValue={this.props.value}
        placeholder={this.props.placeholder}
        onBlur={() => this.validateInput()}
        onChange={e => this.handleChange(e.target.value)}
        min={this.props.min}
        max={this.props.max}
      />);
    } else if (this.props.type === 'radio') {
      return (<GCRadio {...this.props} onChange={v => this.handleChange(v)} />);
    } else if (this.props.type === 'checkbox') {
      return (<GCCheckbox {...this.props} onChange={v => this.handleChange(v)} />);
    } else {
      return (<input
        className={`${invalidClass} ${disabledClass}`}
        disabled={this.props.disabled}
        name={this.props.name}
        type={this.state.type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onBlur={() => this.validateInput()}
        onChange={e => this.handleChange(e.target.value)}
        min={this.props.min}
        max={this.props.max}
      />);
    }
  }

  render() {
    return (
      <div className={`gc-input ${this.props.extendedClass}`}>
        {this.renderInput()}
        {this.state.validationMessage && (
          <p className="gc-input__error-msg">
            {this.state.validationMessage}
          </p>
        )}
      </div>
    );
  }
}

GCInput.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
  ]),
  stateName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  customRegex: PropTypes.object,
  customErrorMessage: PropTypes.string,
  touchedByParent: PropTypes.bool,
  sendResultsToForm: PropTypes.func,
  options: PropTypes.array,
  required: PropTypes.bool,
  size: PropTypes.string,
};

GCInput.defaultProps = {
  extendedClass: '',
  value: null,
  disabled: false,
  name: '',
  placeholder: '',
  maxLength: null,
  minLength: null,
  maxDate: null,
  minDate: null,
  max: null,
  min: null,
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
  sendResultsToForm: null,
  options: [],
  required: false,
  size: 'medium',
};

export default GCInput;
