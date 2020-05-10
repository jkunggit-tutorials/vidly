import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom'

import './App.css';

import Movies from './components/Movies'
import Rentals from './components/Rentals'
import Customers from './components/Customers'
import NavBar from './components/common/NavBar'
import NotFound from './components/NotFound'
import MovieForm from './components/MovieForm'
import LoginForm from './components/common/loginForm';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/rentals" component={Rentals}/>
          <Route path="/customers" component={Customers} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
