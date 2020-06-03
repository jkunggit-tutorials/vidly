import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Movies from './components/Movies';
import Rentals from './components/Rentals';
import Customers from './components/Customers';
import NavBar from './components/common/NavBar';
import NotFound from './components/NotFound';
import MovieForm from './components/MovieForm';
import LoginForm from './components/common/loginForm';
import RegisterForm from './components/common/RegisterForm';
import MoviewForm from './components/MovieForm';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path='/new' component={MovieForm} />
          <Route path='/login' component={LoginForm} />
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

export default App;
