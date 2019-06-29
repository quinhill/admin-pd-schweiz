import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import Courses from './components/courses/Courses';
import Navbar from './components/Navbar';
import AboutKC from './components/about/AboutKC';
import AboutPd from './components/about/AboutPd';
import UserList from './components/users/UserList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Courses} />
            <Route path='/signin' component={SignIn} />
            <Route path='/aboutkc' component={AboutKC} />
            <Route path='/aboutpd' component={AboutPd} />
            <Route path='/users' component={UserList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
