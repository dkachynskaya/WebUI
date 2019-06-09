import React, { Component } from 'react';
import axios from 'axios';
import { history, Role } from '../_helpers';
import { userService, authenticationService } from '../_services';
import del from './images/delete-notes.png';
import { Link } from 'react-router-dom';

const baseUrl = 'http://localhost:4000';

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      comments: [],
      tags: [],
      author: '',
      content: '',
      isAdmin: false,
      currentUser: authenticationService.currentUserValue
    }
  }


  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.role === Role.Admin
    }));

    const { currentUser } = this.state;



    let Id = this.props.match.params.id;

    axios.get(`${baseUrl}/api/posts/` + Id).then((res) => {
      this.setState({
        post: res.data
      });
    }).catch((error) => {
      alert("There is an error in API call");
    });

    axios.get(`${baseUrl}/api/comments/post/` + Id).then((res) => {
      this.setState({
        comments: res.data
      });
    }).catch((error) => {
      alert("There is an error in API call");
    });

    axios.get(`${baseUrl}/api/tags/` + Id).then((res) => {
      this.setState({
        tags: res.data
      });
    }).catch((error) => {
      alert("There is an error in API call");
    });
  }


  handleChange = event => {
    this.setState({ author: event.target.value });
  }

  handleChange2 = event => {
    this.setState({ content: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { currentUser } = this.state;
   
    let Id = this.props.match.params.id;

    const comment = {
      title: this.state.author,
      content: this.state.content,
      postId: Id
    };

    axios.post(`${baseUrl}/api/comments`, comment).then(response => {
      console.log("COMMENTS", response.data);
      debugger;
      axios.get(`${baseUrl}/api/comments/post/` + Id).then((res) => {
        this.setState({
          comments: res.data
        });
      }).catch((error) => {
        alert("There is an error in API call");
      });
    }).catch(error => {
      console.log(error);
    });

  }

  deleteComment(event) {
    
  
    axios.delete(`${baseUrl}/api/comments/${event.target.value}`).then(response => {
      console.log("COMMENTS", response.data);
      debugger;
      axios.get(`${baseUrl}/api/comments/post/${this.state.post.id}`).then((res) => {
        this.setState({
          comments: res.data
        });
      }).catch((error) => {
        alert("There is an error in API call");
      });

    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const { currentUser, isAdmin } = this.state;

    let tags = this.state.tags.map(item => {
      return (
        <div key={item.id}>
          <span>{item.tagName}</span>
        </div>
      );
    });

    let comments = this.state.comments.map(item => {
      return (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.content}</p>
        
          {isAdmin && <button className="btn btn-outline-info my-2 my-sm-0 mb-5" type="submit" value = {item.id} onClick={this.deleteComment}>Видалити</button>
          }
        </div>
      );
    });

    return (

      <div>
        <div className="container">
          <div className="row">
            <h3>{this.state.post.title}</h3>
            <p> {this.state.post.content}</p>
            <ul className="list-inline small text-muted">
              <li className="list-inline-item">{this.state.post.date} </li>
              <li className="list-inline-item">{this.state.post.authorName} </li>
            </ul>
          </div>
        </div>
        <div>
          {tags}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <form className="form-group" onSubmit={this.handleSubmit.bind(this)} id="create-course-form">
                <div class="form-group">
                  <label for="name">Ваше ім'я</label>
                  <input type="textarea" class="form-control" id="name" onChange={(event) => { this.handleChange(event) }} />
                </div>
                <label htmlFor="comment"> Коментар </label>
                <textarea className="form-control mb-2" row="4" aria-label="Search" id="comment" onChange={this.handleChange2.bind(this)} />

                <button className="btn btn-outline-info my-2 my-sm-0 " type="submit">Додати коментар</button>
              </form>
            </div>
          </div>
        </div>
        <div className="container">
         
            {comments}
            



          </div>
        </div>
      
        







     
    );

  }
}

export default PostPage;

