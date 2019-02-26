import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import Home from './components/pages/Home';
import Courses from './components/courses/Courses';
import Navbar from './components/Navbar';
import AboutKC from './components/about/AboutKC';
import AboutPd from './components/about/AboutPd';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={SignIn} />
            <Route path='/courses' component={Courses} />
            <Route path='/aboutkc' component={AboutKC} />
            <Route path='/aboutpd' component={AboutPd} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
