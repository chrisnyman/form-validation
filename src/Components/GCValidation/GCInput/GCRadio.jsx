import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GCInput extends Component {
  renderRadioOpts() {
    return this.props.options.map( o => {
      return (
        <div>
          <input
            type='radio'
            value={o.value}
            key={o.index}
            name={this.props.name}
            title={this.props.title}
            onChange={e => this.handleChange(e)}
          />
          {o.label}
        </div>
      );
    });
  }

  handleChange(e) {
    this.props.onChange(e.target.value, this.props.stateName);
  }

  render() {
    // const invalidClass = this.state.validationMessage ? 'gc-input--invalid' : '';
    const disabledClass = this.props.disabled ? 'gc-input--disabled' : '';
    return (
      <div className={`${disabledClass} ${this.props.extendedClass}`}>
        {this.renderRadioOpts()}
      </div>
    );
  }
}

GCInput.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
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
};

GCInput.defaultProps = {
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
};

export default GCInput;
