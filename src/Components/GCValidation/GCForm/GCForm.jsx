import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import GCInput from '../GCInput/GCInput';

import './gc-form.css';

class GCForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formValid: false,
      formSubmitted: false,
    }
  }

  submitForm(e) {
    e.preventDefault();
    console.log('form submitted');
    this.setState({ formSubmitted: true }, () => {
      console.log(this.state);
    });
  }

  getFields() {
    return _.mapValues(this.props.data, d =>
      (<GCInput
        {...d}
        onChange={this.props.handleInputChange}
        touchedByParent={this.state.formSubmitted}
      />));
  }

  // validateInput(children) {
  //   let isValid = 0;
  //   React.Children.forEach(children, (child) => {
  //     const isGCInput = child.type.name === 'GCInput';
  //     if (isGCInput) {
  //
  //       if (child.type.validateInput(child.props) != null) {
  //         isValid += 1;
  //       }
  //     }
  //   });
  //   return isValid === 0;
  // }

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
