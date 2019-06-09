import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { userService } from '../_services';

const baseUrl = 'http://localhost:4000'

class CreateUser extends Component {
	constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
	  username: '',
	  password: ''
    }
  }

  handleChange = event => {
    this.setState({ firstName: event.target.value });
  }

  handleChange2 = event => {
    this.setState({ lastName: event.target.value });
  }
  
   handleChange3 = event => {
    this.setState({ username: event.target.value });
  }
  
   handleChange4 = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
	  username: this.state.username,
	  password: this.state.password
    };

    userService.create(user).then(users => this.setState({ users }));
	  
	this.props.history.push('/admin');
}

  	

	render(){
        return (
        	<form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
								<input className="form-control mr-sm-2" type="search" aria-label="Search" onChange={this.handleChange.bind(this)} />
								<input className="form-control mr-sm-2" type="textarea" rows="3" aria-label="Search" onChange={this.handleChange2.bind(this)} />
								<input className="form-control mr-sm-2" type="search" aria-label="Search" onChange={this.handleChange3.bind(this)} />
								<input className="form-control mr-sm-2" type="textarea" rows="3" aria-label="Search" onChange={this.handleChange4.bind(this)} />
								<button className="btn btn-outline-info my-2 my-sm-0" type="submit">Додати коментар</button>
			</form>
        );
    }
}

export default CreateUser;