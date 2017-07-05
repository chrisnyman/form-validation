import * as React from 'react';
import { Component } from 'react';
import GCForm from './Components/GCValidation/GCForm/GCForm';

import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      url: '',
      check: false,
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
      url: {
        value: this.state.url,
        stateName: 'url',
        name: 'urlTxt',
        type: 'url',
        placeholder: 'https://'
      },
      check: {
        value: this.state.check,
        stateName: 'check',
        name: 'checkTxt',
        type: 'checkbox',
      },
      radio: {
        value: this.state.check,
        stateName: 'radio',
        name: 'radioList',
        type: 'radio',
        options: [{
          value: 'horse',
          label: 'Choose horse'
        }, {
          value: 'cat',
          label: 'Choose cat'
        }, {
          value: 'dog',
          label: 'Choose dog'
        }]
      },
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
                  htmlFor="urlTxt"
                  className="gc-form__label"
                >Enter a URL</label>
                {fields.url}

                <label
                  htmlFor="checkTxt"
                  className="gc-form__label"
                >Are you having fun?</label>
                {fields.check}

                <label
                  htmlFor="radioTxt"
                  className="gc-form__label"
                >Radio Buttons</label>
              {fields.radio}

                <button className="gc-form__submit-btn">Submit</button>
              </div>)}
          </GCForm>

        </div>
      </div>
    );
  }
}

export default App;
