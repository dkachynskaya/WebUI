import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const baseUrl = 'http://localhost:4000'

class CreatePost extends Component {
	constructor(){
    super();
    this.state = {
      title: '',
      author: '',
      content: ''
    }
  }

  handleChange = event => {
    this.setState({ title: event.target.value });
  }

  handleChange2 = event => {
    this.setState({ author: event.target.value });
  }

  handleChange3 = event => {
    this.setState({ content: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const post = {
      Title: this.state.title,
      AuthorName: this.state.author,
      Content: this.state.content
    };

    axios.post(`${baseUrl}/api/posts`, post).then(response => {
        this.setState({ 
        	posts: response.data 
        });
      }).catch(error => {
        console.log(error);
      });
}

  	

	render(){
        return (
        	<Form onSubmit={this.handleSubmit}>
  				<Form.Group controlId="exampleForm.ControlInput1">
    				<Form.Label>Заголовок</Form.Label>
    				<Form.Control type="text" onChange={this.handleChange} />
  				</Form.Group>
  				<Form.Group controlId="exampleForm.ControlInput2">
    				<Form.Label>Автор</Form.Label>
    				<Form.Control type="text" onChange={this.handleChange2} />
  				</Form.Group>
  				<Form.Group controlId="exampleForm.ControlTextarea1">
    				<Form.Label>Контент</Form.Label>
    				<Form.Control as="textarea" rows="3" onChange={this.handleChange3} />
  				</Form.Group>
  				<Button type="submit" variant="primary">Створити</Button>
			</Form>
        );
    }
}

export default CreatePost;