import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-form.css';

class GCForm extends Component {

  onSubmit(e) {
    e.preventDefault();
    console.log('Form submitted');
    this.getInputData(this.props.children);
  }

  getInputData(children) {
    const inputArr = children.filter((child) => {
      const isInput = child.type.name === 'GCInput';
      child.props.touchChild = true;
      return isInput;
    });
    console.log(inputArr);
  }

  render() {
    return (
      <form className="gc-form" onSubmit={e => this.onSubmit(e)}>
        {this.props.children}
      </form>
    );
  }
}

GCForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GCForm;
