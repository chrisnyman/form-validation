
const FooSimple = ({
  actions,
  name,
  email,
}) => {

  return (
  <div>
    <span>This is a form</span>
    <Form
      onSubmit={actions.submit}
      fields={
        name: {
          type: 'text',
          name,
        },
        email: {
          type: 'email',
          email,
        },
      }
    />
  </div>
  );
};

const FooComplex = ({
  actions,
  name,
  email,
}) => {

  return (
  <div>
    <span>This is a form</span>
    <Form
      onSubmit={actions.submit}
      initialFields={
        name: {
          type: 'text',
          value: name,
        },
        email: {
          type: 'email',
          value: email,
        },
      }
    >
      {({
        message,
        fields
      }) => (
        <div>
          <div>{fields.name}</div>
          {fields.email}
          <button>Submit</button>
          {message}
        </div>
      )}
    </Form>
  </div>
  );
};



fields = {
  name: {
    type: 'text',
    value: 'foo'
  },
  email: {
    type: 'email',
    value: 'person@place.com'
  }
}


class Form extends Component {
  static defaultProps = {
    children: defaultChildrenRenderer
  }

  constructor() {
    this.state = {
      submitPressed: false,
      fields: this.props.initialFields,
    };
  }

  onSubmit = () => {
    if (this.canSubmit()) {
      this.setState({ submitPressed: false });
      this.props.onSubmit(this.state.fields);
    }
    else {
      this.setState({ submitPressed: true });
    }
  }

  onChange = (name, value) => {
    this.setState({
      fields: _.assign({}, this.state.fields, {
        [name]: value,
      })
    });
  }

  canSubmit() {
    return this.fieldsAreValid() && this.requiredFieldsAreCompleted();
  }

  fieldsAreValid() {
  }

  requiredFieldsAreCompleted() {
  }

  getMessage() {
     if (!this.state.submitPressed) return undefined;
     const isValid = this.fieldsAreValid();
     const requiredFieldsAreCompleted = this.requiredFieldsAreCompleted();
     if (!isValid && !requiredFieldsAreCompleted) {
       return "You have some missing required fields and some are invalid";
     }
     else if (!isValid) {
       return "Not all fields are valid";
     }
     else if (!requiredFieldsAreCompleted) {
       return "Not all required fields are filled in";
     }
     else {
       return undefined;
     }
  }

  getFields() {
    return _.mapValues(this.props.fields, field =>
      <Input
        {...field}
        onChange={onChange}
      />
    );
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.props.children({
          message: this.getMessage(),
          fields: this.getFields(),
        })}
      </form>
    )
  }
}

// Default
const defaultChildrenRenderer = ({
  message,
  fields,
}) => (
  {_.values(fields)}
  {message}
  <button>Submit</button>
);

// reasoning
// 1. layout isnt standard accross forms, need to be able to customise
// where fields are layed out, while still providing default implementation
// for simple cases
// 2. we need to record state about whether submit was pressed in order to
// show messages. We dont want to duplicate that logic in every form component.
// 3. we want to reuse standard messages for each form rather than duplicate
// copy all over the place


class Input extends Component {
  onChange(e) {
    this.props.onChange(this.props.name, e.value);
  }
  render() {
    <input onBlur={onChange} />
  }
}
