import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import Movies from './components/Movies';
import Rentals from './components/Rentals';
import Customers from './components/Customers';
import NavBar from './components/common/NavBar';
import NotFound from './components/NotFound';
import MovieForm from './components/MovieForm';
import LoginForm from './components/common/loginForm';
import Logout from './components/common/logout';
import RegisterForm from './components/common/RegisterForm';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className='container'>
          <Switch>
            <Route path='/new' component={MovieForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/movies/:id' component={MovieForm} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/customers' component={Customers} />
            <Route path='/movies' exact component={Movies} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
