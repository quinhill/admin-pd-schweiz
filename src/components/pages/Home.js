import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Home extends Component {

  render() {

    const { courses, auth } = this.props;

    if (!auth.uid) {
      return <Redirect to='/signin' />
    }

    return (
      <div></div>
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