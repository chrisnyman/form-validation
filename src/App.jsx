import * as React from "react";
import { Component } from 'react';
import GCForm from './Components/GCValidation/GCForm/GCForm';
import GCInput from './Components/GCValidation/GCInput/GCInput';

import './App.css';

import logo from './logo.svg';
import mainLogo from './images/logo.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={mainLogo} alt="logo" />
          <h2>Welcome to React using Fusebox </h2>
        </div>
        <p className="App-intro">
            To get started, edit
            <code>src/App.js</code>
            and save to reload.
        </p>
        <h1>
            instant load  time
        </h1>

        <div>
          <GCForm>

            <label
              htmlFor="nameTxt"
              className="gc-form__label"
            >Name</label>
            <GCInput
              ref={(input) => { this.input = input; }}
              name="nameTxt"
              placeholder="Please enter your name"
              type="name"
              required
              valid
              touchedByParent="false"
            />

            <label
              htmlFor="emailTxt"
              className="gc-form__label"
            >Email</label>
            <GCInput
              name="emailTxt"
              placeholder="name@domain.com"
              type="email"
              valid
              touchedByParent="false"
            />

            <label
              htmlFor="passwordTxt"
              className="gc-form__label"
            >Password</label>
            <GCInput
              name="passwordTxt"
              type="password"
              valid
              touchedByParent="false"
            />

            <label
              htmlFor="dateTxt"
              className="gc-form__label"
            >Date</label>
            <GCInput
              name="dateTxt"
              type="date"
              maxDate="2017-07-23"
              valid
              touchedByParent="false"
            />

            <label
              htmlFor="rangeTxt"
              className="gc-form__label"
            >Date</label>
            <GCInput
              name="rangeTxt"
              type="range"
              max="20"
              min="4"
              defaultValue="9"
              valid
              touchedByParent="false"
            />

            <button className="gc-form__submit-btn">Submit</button>

          </GCForm>

        </div>
      </div>
    );
  }
}

export default App;
