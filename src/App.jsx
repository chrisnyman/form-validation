import * as React from 'react';
import { Component } from 'react';
import GCForm from './Components/GCValidation/GCForm/GCForm';

import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ts: '',
      tm: '',
      tl: '',
      url: '',
      check: false,
      checkList: 'horse, cat',
      radio: 'cat',
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
      textareaS: {
        value: this.state.ts,
        stateName: 'ts',
        name: 'textSTxt',
        type: 'textarea',
        size: 'small',
        placeholder: 'This is a small textarea',
      },
      textareaM: {
        value: this.state.tm,
        stateName: 'tm',
        name: 'textMTxt',
        type: 'textarea',
        size: 'medium',
        placeholder: 'This is a medium textarea',
      },
      textareaL: {
        value: this.state.tl,
        stateName: 'tl',
        name: 'textLTxt',
        type: 'textarea',
        size: 'large',
        placeholder: 'This is a large textarea',
      },
      check: {
        value: this.state.check,
        stateName: 'check',
        name: 'checkTxt',
        type: 'checkbox',
        required: true,
      },
      radio: {
        value: this.state.radio,
        stateName: 'radio',
        name: 'radioList',
        type: 'radio',
        required: true,
        options: [{
          value: 'horse',
          label: 'Choose horse',
        }, {
          value: 'cat',
          label: 'Choose cat',
        }, {
          value: 'dog',
          label: 'Choose dog',
        }],
      },
      checkList: {
        value: this.state.checkList,
        stateName: 'checkList',
        name: 'checkList',
        type: 'checkbox',
        required: true,
        minLength: 1,
        maxLength: 2,
        options: [{
          value: 'horse',
          label: 'Choose horse',
        }, {
          value: 'cat',
          label: 'Choose cat',
        }, {
          value: 'dog',
          label: 'Choose dog',
        }],
      },
    };
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
                  htmlFor="textSTxt"
                  className="gc-form__label"
                >Textarea small</label>
                {fields.textareaS}

                <label
                  htmlFor="textMTxt"
                  className="gc-form__label"
                >Textarea medium</label>
                {fields.textareaM}

                <label
                  htmlFor="textLTxt"
                  className="gc-form__label"
                >Textarea large</label>
                {fields.textareaL}

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

                <label
                  htmlFor="groupcheckTxt"
                  className="gc-form__label"
                >Group Checkbox</label>
              {fields.checkList}

                <button className="gc-form__submit-btn">Submit</button>
              </div>)}
          </GCForm>

        </div>
      </div>
    );
  }
}

export default App;
