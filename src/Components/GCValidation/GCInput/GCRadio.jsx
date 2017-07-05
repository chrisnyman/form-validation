import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GCInput extends Component {
  renderRadioOpts() {
    return this.props.options.map( o => {
      return (
        <div>
          <input type='radio' value={o.value} key={o.index} /> {o.label}
        </div>
      );
    });
  }

  render() {
    // const invalidClass = this.state.validationMessage ? 'gc-input--invalid' : '';
    const disabledClass = this.props.disabled ? 'gc-input--disabled' : '';
    return (
      <div className={`${disabledClass}`}>
        {this.renderRadioOpts()}
      </div>
    );
  }
}

GCInput.propTypes = {
  extendedClass: PropTypes.string,
  stateName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customErrorMessage: PropTypes.string,
  touchedByParent: PropTypes.bool,
  sendResultsToForm: PropTypes.func,
  options: PropTypes.array,
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
};

export default GCInput;