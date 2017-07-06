import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GCCheckbox extends Component {
  renderCheckboxOpts() {
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
          />
          {opt.label}
        </div>
      );
    });
  }

  matchValues(arr, value) {
    console.log(arr.includes(value));
    return arr.includes(value);
  }

  handleChange(e) {
    if(this.props.options.length === 1) {
      this.props.onChange(e.target.value, this.props.stateName);
    }
    this.props.onChange(e.target.value, this.props.stateName);
  }

  render() {
    const disabledClass = this.props.disabled ? 'gc-input--disabled' : '';
    return (
      <div className={`${disabledClass} ${this.props.extendedClass}`}>
        {this.renderCheckboxOpts()}
      </div>
    );
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
