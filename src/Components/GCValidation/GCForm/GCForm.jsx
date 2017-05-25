import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-form.css';

class GCForm extends Component {

  onSubmit(e) {
    e.preventDefault();
    const shouldSubmit = this.testInput(this.props.children);
  }

  testInput(children) {
    let isValid = 0;
    React.Children.forEach(children, (child) => {
      const isGCInput = child.type.name === 'GCInput';
      if (isGCInput) {
        isValid = isValid && child.type.validateInput(child.props);
        console.log(child.props.value);
      }
    });
    // return isValid !== 0;
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
