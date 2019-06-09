import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { history, Role } from '../_helpers';
import { authenticationService } from '../_services';
import { PrivateRoute } from '../_components/PrivateRoute';

const baseUrl = 'http://localhost:4000'

class SearchPage extends Component {
	constructor(props){
    super(props);
    this.state = {
      posts: [],
	  word: ''
    }
  }

  componentDidMount(){
	  authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
		
  		var {match} = this.props;
  		let Id = match.params.id;
      	axios.get(`${baseUrl}/api/posts/` + Id).then((res)=>{
      this.setState({
        post:res.data
      });
    }).catch((error)=>{
      alert("There is an error in API call");
    });
    	axios.get(`${baseUrl}/api/comments/` + Id).then((res)=>{
      this.setState({
        comments:res.data
      });
    }).catch((error)=>{
      alert("There is an error in API call");
    });
	
	axios.get(`${baseUrl}/api/tags/` + Id).then((res)=>{
      this.setState({
        tags:res.data
      });
    }).catch((error)=>{
      alert("There is an error in API call");
    });
  }

  handleChange = event => {
    this.setState({ title: event.target.value });
  }

  handleChange2 = event => {
    this.setState({ content: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    var {match} = this.props;
  	let Id = match.params.id;

    const comment = {
      title: this.state.title,
      content: this.state.content,
      postId: this.Id
    };

    axios.post(`${baseUrl}/api/comments`, comment).then(response => {
        this.setState({ 
        	comments: response.data 
        });
      }).catch(error => {
        console.log(error);
      });
}

  render() {
	  const { currentUser, isAdmin } = this.state;
  	let comments = this.state.comments.map(item => {
      return (    
          <div key={item.id}>
            <h1 className="h1 text-center">{item.title}</h1>
            <div className="text-justify">{item.content}</div>
            <div className="text-justify">{item.date}</div>         
            <hr />
          </div>  
      );
    });
    return (
		<div>
      		<h3>{this.state.post.title}</h3>
      		<div dangerouslySetInnerHTML={{ __html : this.state.post.content }}></div>
      		<div dangerouslySetInnerHTML={{ __html : this.state.post.date }}></div>
      		<div dangerouslySetInnerHTML={{ __html : this.state.post.authorName }}></div>
    	
 			<div>
  				{tags}
  			</div>
			
			<form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
								<input className="form-control mr-sm-2" type="search" aria-label="Search" onChange={this.handleChange.bind(this)} />
								<input className="form-control mr-sm-2" type="textarea" rows="3" aria-label="Search" onChange={this.handleChange2.bind(this)} />
								<button className="btn btn-outline-info my-2 my-sm-0" type="submit">Додати коментар</button>
								{isAdmin && <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Видалити</button>}
			</form>
      		
				
      		<div>
  				{comments}
  			</div>
			
  		</div>
    );
    
  }
}

export default SearchPage;
/*
<Form onSubmit={this.handleSubmit.bind(this)}>
  				<Form.Group controlId="exampleForm.ControlInput1">
    				<Form.Label>Заголовок</Form.Label>
    				<Form.Control type="text" onChange={this.handleChange.bind(this)}  />
  				</Form.Group>
  				<Form.Group controlId="exampleForm.ControlTextarea1">
    				<Form.Label>Контент</Form.Label>
    				<Form.Control as="textarea" rows="3" onChange={this.handleChange3} />
  				</Form.Group>
  				<Button type="submit" variant="primary">Додати</Button>
			</Form>*/

