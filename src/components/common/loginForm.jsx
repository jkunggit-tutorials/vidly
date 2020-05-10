import React, { Component } from 'react';

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
  }

  componentDidMount() {
    // this.username.current.focus();
  }

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (account.password.trim() === '') {
      errors.password = 'Password is required';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
    //const username = this.username.current.value;
    // console.log('submit', username);
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={account.name}
            label='user Name'
            onChange={this.handleChange}
          />
          <Input
            name='password'
            value={account.password}
            label='Password'
            onChange={this.handleChange}
          />
          <button className='btn btn-primary'>Login</button>
        </form>
      </div>
    );
  }
}
export default LoginForm;
