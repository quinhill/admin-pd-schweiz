import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import Home from './components/pages/Home';
import CourseList from './components/courses/CourseList';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={SignIn} />
            <Route path='/courses' component={CourseList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
