import * as React from 'react';
import { Component } from 'react';
import GCForm from './Components/GCValidation/GCForm/GCForm';

import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: '',
      name: '',
      email: '',
      password: '',
      date: '',
      range: '',
      text: '',
      number: '',
      disabled: '',
      textarea: '',
    };
  }

  handleChange(value, type) {
    const obj = {};
    obj[type] = value;
    this.setState(obj);
  }

  handleSubmit() {
    console.log('submitted');
  }

  render() {
    const formFields = {
      name: {
        value: this.state.name,
        stateName: 'name',
        name: 'nameTxt',
        type: 'name',
        placeholder: 'Please enter your name',
        required: true
      },
      textarea: {
        value: this.state.textarea,
        stateName: 'textarea',
        name: 'textareaTxt',
        type: 'textarea',
        placeholder: 'Tell me more about yourself...',
        required: true,
      },
      email: {
        value: this.state.email,
        stateName: 'email',
        name: 'emailTxt',
        type: 'email',
        placeholder: 'name@domain.com'
      },
      number: {
        value: this.state.number,
        stateName: 'number',
        name: 'numTxt',
        type: 'number',
        min: 5,
        max: 10
      },
      regex: {
        value: this.state.text,
        stateName: 'text',
        name: 'nameTxt',
        type: 'text',
        placeholder: "Type something that starts with a 'W'.",
        customRegex: /\bW/g,
        customErrorMessage: 'Must start with uppercase W'
      },
      password: {
        value: this.state.password,
        stateName: 'password',
        name: 'passwordTxt',
        type: 'password',
        minLength: 8
      },
      date: {
        value: this.state.date,
        stateName: 'date',
        name: 'dateTxt',
        type: 'date',
        maxDate: '2017-07-23'
      },
      range: {
        value: this.state.range,
        stateName: 'range',
        name: 'rangeTxt',
        type: 'range',
        max: 20,
        min: 4,
        defaultValue: '9'
      },
      disabled: {
        value: this.state.disabled,
        stateName: 'disabled',
        name: 'disabledTxt',
        placeholder: 'This input is disabled.',
        type: 'text',
        disabled: true
      }
    }
    return (
      <div className="App">
        <h1>GC Form Validation</h1>

        <div>
          <GCForm
            data={formFields}
            onSubmit={() => this.handleSubmit()}
            handleInputChange={(v, t) => this.handleChange(v, t)}
          >
            {({ fields }) => (
              <div>
                <label
                  htmlFor="nameTxt"
                  className="gc-form__label"
                >Name</label>
                {fields.name}

                <label
                  htmlFor="textareaTxt"
                  className="gc-form__label"
                >Bio</label>
              {fields.textarea}

                <label
                  htmlFor="emailTxt"
                  className="gc-form__label"
                >Email</label>
                {fields.email}

                <label
                  htmlFor="numTxt"
                  className="gc-form__label"
                >Number</label>
                {fields.number}

                <label
                  htmlFor="nameTxt"
                  className="gc-form__label"
                >Custom Regular Expression</label>
                {fields.regex}

                <label
                  htmlFor="passwordTxt"
                  className="gc-form__label"
                >Password</label>
                {fields.password}

                <div>
                  <label
                    htmlFor="dateTxt"
                    className="gc-form__label"
                  >Date</label>
                  {fields.date}
                </div>

                <label
                  htmlFor="rangeTxt"
                  className="gc-form__label"
                >Range</label>
                {fields.range}

                <label
                  htmlFor="rangeTxt"
                  className="gc-form__label"
                >Disabled</label>
                {fields.disabled}

                <button className="gc-form__submit-btn">Submit</button>
              </div>)}
          </GCForm>

        </div>
      </div>
    );
  }
}

export default App;
