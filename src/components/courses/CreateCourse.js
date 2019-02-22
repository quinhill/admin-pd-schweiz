import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCourse } from '../../store/actions/courseActions';

class CreateCourse extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      location: '',
      time: '',
      date: '',
      cost: '',
      description: ''
    }
  }

  componentDidMount() {
    this.setState({
      title: 'Einführungskurs: Zum Wohlergehen der ganzen Familie mit der Positiven Disziplin',
      location: 'Schule Pfrundmatte, 1. Stock (Bibliothek), Meiringen',
      cost: '150Fr. pro Person. Babysitter Rabatt: 240Fr. für beide Eltern',
      time: '19.30 - 21.45h',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createCourse(this.state)
  }

  render() {
    return(
      <div>
        <form 
          className='course-form'
          onSubmit={this.handleSubmit}
        >
          <input 
            type='text'
            placeholder='Course Title'
            name='title'
            onChange={this.handleChange}
            value={this.state.title}
          />
          <input 
            type='text'
            placeholder='Date'
            name='date'
            onChange={this.handleChange}
            value={this.state.date}
          />
          <input 
            type='text'
            placeholder='Time'
            name='time'
            onChange={this.handleChange}
            value={this.state.time}
          />
          <input 
            type='text'
            placeholder='Location'
            name='location'
            onChange={this.handleChange}
            value={this.state.location}
          />
          <input 
            type='text'
            placeholder='Cost'
            name='cost'
            onChange={this.handleChange}
            value={this.state.cost}
          />
          <textarea 
            placeholder='Description of course...'
            name='description'
            onChange={this.handleChange}
            value={this.state.description}
          />
          <button 
            type='submit'
            className='medium-button'
          >
            Submit Course
          </button>
        </form>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCourse: (course) => dispatch(createCourse(course))
  }
}

export default connect(null, mapDispatchToProps)(CreateCourse);