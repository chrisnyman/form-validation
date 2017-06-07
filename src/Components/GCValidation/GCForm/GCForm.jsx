import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './gc-form.css';

class GCForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      submitPressed: false
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({submitPressed: true}, () => {
      const children = this.getChildren();
      const shouldSubmit = this.testInput(children);
    })
  }

  testInput(children) {
    let isValid = 0;
    React.Children.forEach(children, (child) => {
      const isGCInput = child.type.name === 'GCInput';
      if (isGCInput) {
        isValid = isValid && child.type.validateInput(child.props);
        console.log(child.type.validateInput(child.props));
      }
    });
    return !!isValid;
  }

  getChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (child.type.name === 'GCInput') {
        return React.cloneElement(child, {
          submitPressed: this.state.submitPressed
        });
      } else {
        return child;
      }
    })
  }

  render() {
    return (
      <form className="gc-form" onSubmit={e => this.onSubmit(e)}>
        {this.state.submitPressed ? this.getChildren() : this.props.children}

      </form>
    );
  }
}

GCForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GCForm;
