import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CourseList from '../courses/CourseList';


class Home extends Component {

  render() {

    const { auth } = this.props;

    if (!auth.uid) {
      return <Redirect to='/signin' />
    }

    return (
      <div>
        <CourseList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Home);