import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Home from './components/Home';
import CreateCourse from './components/CreateCourse';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={SignIn} />
            <Route path='/courses' component={CreateCourse} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
