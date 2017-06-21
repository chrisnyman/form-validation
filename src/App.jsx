import * as React from 'react';
import { Component } from 'react';
import GCForm from './Components/GCValidation/GCForm/GCForm';
import GCInput from './Components/GCValidation/GCInput/GCInput';

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
    return (
      <div className="App">
        <h1>
            GC Form Validation
        </h1>

        <div>
          <GCForm onSubmit={() => this.handleSubmit()}>
            <label
              htmlFor="nameTxt"
              className="gc-form__label"
            >Name</label>
            <GCInput
              onChange={val => this.handleChange(val, 'name')}
              value={this.state.name}
              ref={(input) => { this.input = input; }}
              name="nameTxt"
              placeholder="Please enter your name"
              type="name"
              required
            />

            <label
              htmlFor="emailTxt"
              className="gc-form__label"
            >Email</label>
            <GCInput
              onChange={val => this.handleChange(val, 'email')}
              value={this.state.email}
              name="emailTxt"
              placeholder="name@domain.com"
              type="email"
            />

            <label
              htmlFor="numTxt"
              className="gc-form__label"
            >Number</label>

            <GCInput
              onChange={val => this.handleChange(val, 'number')}
              value={this.state.number}
              name="numTxt"
              type="number"
              min={5}
              max={10}
            />

            <label
              htmlFor="nameTxt"
              className="gc-form__label"
            >Custom Regular Expression</label>
            <GCInput
              onChange={val => this.handleChange(val, 'text')}
              value={this.state.text}
              name="nameTxt"
              placeholder="Type something that starts with a 'W'."
              customRegex={/\bW/g}
              customErrorMessage="Must start with uppercase W"
              type="text"
            />

            <label
              htmlFor="passwordTxt"
              className="gc-form__label"
            >Password</label>
            <GCInput
              onChange={val => this.handleChange(val, 'password')}
              value={this.state.password}
              name="passwordTxt"
              type="password"
              minLength={8}
            />

          <div>
            <label
              htmlFor="dateTxt"
              className="gc-form__label"
            >Date</label>
            <GCInput
              onChange={val => this.handleChange(val, 'date')}
              value={this.state.date}
              name="dateTxt"
              type="date"
              maxDate="2017-07-23"
            />
          </div>

            <label
              htmlFor="rangeTxt"
              className="gc-form__label"
            >Range</label>
            <GCInput
              onChange={val => this.handleChange(val, 'range')}
              value={this.state.range}
              name="rangeTxt"
              type="range"
              max={20}
              min={4}
              defaultValue="9"
            />

            <label
              htmlFor="rangeTxt"
              className="gc-form__label"
            >Disabled</label>
            <GCInput
              onChange={val => this.handleChange(val, 'disabled')}
              value={this.state.disabled}
              name="disabledTxt"
              placeholder="This input is disabled."
              type="text"
              disabled
            />

            <button className="gc-form__submit-btn">Submit</button>

          </GCForm>

        </div>
      </div>
    );
  }
}

export default App;
