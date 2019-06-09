import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const baseUrl = 'http://localhost:4000';

class CreatePost extends Component {
	constructor(){
    super();
    this.state = { 
      post: {title: '', author: '', content: ''}
    }
  }

  componentDidMount(){
      var {match} = this.props;
      let Id = match.params.id;
        axios.get(`${baseUrl}/api/posts/` + Id).then((res)=>{
      this.setState({
        post:res.data
      });
    }).catch((error)=>{
      alert("There is an error in API call");
    });
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

  handleSubmit = (event) => {
    event.preventDefault();
    var {match} = this.props;
    let Id = match.params.id;

    const post ={
      Title: "this.props.title",
      AuthorName: "this.props.author",
      Content: "this.props.content"
    }

    axios.put(`${baseUrl}/api/posts/` + Id, post).then(response => {
        this.setState({ 
        	post: response.data
        });
      }).catch(error => {
        console.log(error);
      });
}

  	

	render(){
        return (
        	<Form onSubmit={this.handleSubmit.bind(this)}>
  				<Form.Group controlId="exampleForm.ControlInput1">
    				<Form.Label>Заголовок</Form.Label>
    				<Form.Control type="text" onChange={this.handleChange.bind(this)} value={this.state.post.Title} />
  				</Form.Group>
  				<Form.Group controlId="exampleForm.ControlInput2">
    				<Form.Label>Автор</Form.Label>
    				<Form.Control type="text" onChange={this.handleChange2} value={this.state.post.AuthorName} />
  				</Form.Group>
  				<Form.Group controlId="exampleForm.ControlTextarea1">
    				<Form.Label>Контент</Form.Label>
    				<Form.Control as="textarea" rows="3" onChange={this.handleChange3} value={this.state.post.Content} />
  				</Form.Group>
  				<Button type="submit" variant="primary">Редагувати</Button>
			</Form>
        );
    }
}

export default CreatePost;