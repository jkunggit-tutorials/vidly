import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './Input';

class LoginForm extends Component {
  constructor() {
    super();

    // only use ref when you absolutely need to like when you want to focus.
    this.username = React.createRef();

    this.state = {
      account: {
        username: '',
        password: '',
      },
      errors: {},
    };

    this.schema = {
      username: Joi.string().required().label('Username'),
      password: Joi.string().required().label('Password'),
    };
  }

  componentDidMount() {
    // this.username.current.focus();
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    // we cannot have errors as null
    this.setState({ errors: errors || {} });
    if (errors) return;
    //const username = this.username.current.value;
    // console.log('submit', username);
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    // validate a specific field
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={account.name}
            label='user Name'
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name='password'
            value={account.password}
            label='Password'
            onChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className='btn btn-primary'>
            Login
          </button>
        </form>
      </div>
    );
  }
}
export default LoginForm;
