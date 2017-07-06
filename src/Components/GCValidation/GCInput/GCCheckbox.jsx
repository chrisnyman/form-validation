import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GCCheckbox extends Component {
  renderCheckboxOpts() {
    console.log('being rendered');
    const props = this.props;
    return props.options.map((opt) => {
      const d = new Date();
      const uid = d.getTime() * 2;
      return (
        <div>
          <input
            type="checkbox"
            value={opt.value}
            key={uid}
            name={props.name}
            title={props.title}
            onChange={e => this.handleChange(e)}
            checked={this.matchValues(props.value, opt.value)}
            disabled={this.props.disabled}
          />
          {opt.label}
        </div>
      );
    });
  }

  matchValues(arr, value) {
    return arr.includes(value);
  }

  removeFromArray(arr, item) {
    const index = arr.findIndex(el => item === el);
    return arr.splice(index, item);
  }

  handleChange(e) {
    /*
      If value was not part of the initial value array then the value should be added to the array.
      If the value is part of the array then the value must be removed
    */
    const props = this.props;
    const newValue = e.target.value;
    const prevValue = props.value;

    if (props.options.length === 0) {
      this.props.onChange(!props.value, this.props.stateName);
    } else {
      let newArray = prevValue;
      if (prevValue.includes(newValue)) {
        // Remove selected value
        newArray = this.removeFromArray(prevValue, newValue);
      } else {
        // Add value to array
        newArray.push(newValue);
      }
      this.props.onChange(newArray, this.props.stateName);
    }
  }

  render() {
    const props = this.props;
    const disabledClass = props.disabled ? 'gc-input--disabled' : '';
    if(props.options.length >= 1) {
      return (
        <div className={`${disabledClass} ${props.extendedClass}`}>
          {this.renderCheckboxOpts()}
        </div>
      );
    } else {
      return (
        <input
          className={`${disabledClass} ${props.extendedClass}`}
          type="checkbox"
          name={props.name}
          title={props.title}
          onChange={e => this.handleChange(e)}
          checked={props.value}
          disabled={this.props.disabled}
        />);
    }
  }
}

GCCheckbox.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
  ]),
  stateName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customErrorMessage: PropTypes.string,
  touchedByParent: PropTypes.bool,
  sendResultsToForm: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string,
  multiple: PropTypes.bool,
};

GCCheckbox.defaultProps = {
  extendedClass: '',
  value: null,
  disabled: false,
  name: '',
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
  sendResultsToForm: null,
  options: [],
  title: null,
  multiple: false,
};

export default GCCheckbox;
