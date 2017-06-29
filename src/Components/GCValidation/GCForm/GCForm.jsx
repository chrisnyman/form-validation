import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import GCInput from '../GCInput/GCInput';

import './gc-form.css';

class GCForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formValid: 0,
      formSubmitted: false,
    };
  }

  submitForm(e) {
    e.preventDefault();
    this.setState({ formSubmitted: true });
  }

  validateForm(results) {
    if(!results) {
      const validCount = this.state.formValid + 1;
      this.setState({ formValid: validCount }, () => {
        console.log(validCount);
      });
    }
  }

  getFields() {
    return _.mapValues(this.props.data, d =>
      (<GCInput
        {...d}
        onChange={this.props.handleInputChange}
        touchedByParent={this.state.formSubmitted}
        sendResultsToForm={r => this.validateForm(r)}
      />));
  }

  render() {
    return (
      <form
        className="gc-form"
        onSubmit={e => this.submitForm(e)}
      >
        {this.props.children({ fields: this.getFields() })}
      </form>
    );
  }
}

GCForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default GCForm;
