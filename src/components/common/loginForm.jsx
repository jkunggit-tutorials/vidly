import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';

import Form from './Form';
// import * as authService from '../../services/authService';
import auth from '../../services/authService';

class LoginForm extends Form {
  constructor() {
    super();

    // only use ref when you absolutely need to like when you want to focus.
    this.username = React.createRef();

    this.state = {
      data: {
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

  doSubmit = async () => {
    const { data } = this.state;
    try {
      await auth.login(data.username, data.password);
      // this.props.history.push('/'); // redirect to home page
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to='/' />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}
export default LoginForm;
