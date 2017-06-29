import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import GCInput from '../GCInput/GCInput';

import './gc-form.css';
let GCFormCounter = 0;

class GCForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formSubmitted: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.formSubmitted) {
      this.setState({ formSubmitted: false });
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

  submitForm(e) {
    e.preventDefault();
    this.setState({ formSubmitted: true });

    setTimeout(() => {
      const dataKeys = Object.keys(this.props.data);
      if (GCFormCounter === dataKeys.length) {
        this.props.onSubmit();
      }
      GCFormCounter = 0;
    }, 500);
  }

  validateForm(results) {
    if (results) {
      GCFormCounter++;
    }
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
  onSubmit: PropTypes.func.isRequired,
};

export default GCForm;
