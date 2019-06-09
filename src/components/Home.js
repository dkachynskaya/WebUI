import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cat from './cat.jpg'

const baseUrl = 'http://localhost:4000'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      posts: [],
    }
  }

  deletePost(event) {
    axios.delete(`${baseUrl}/api/posts/${event.target.value}`).then(response => {
      this.setState({
        posts: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    axios.get(`${baseUrl}/api/posts`).then((res) => {
      this.setState({
        posts: res.data
      });
    }).catch((error) => {
      alert("There is an error in API call");
    });
  }

  render() {
    let posts = this.state.posts.map(item => {
      return (<div key={item.Id} className="col-md-4 p-3 rounded-lg">
        <img src={item.imageUrl} alt="" className="img-fluid rounded-lg" />
        <Link to={`/blog/${item.id}`}><h3 className="pt-3">{item.title}</h3></Link>
        <p>{item.content}</p>



      </div>
      );
    });
    return (
      <div>
        <div className="container"	>
          <div className="row">
            {posts}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;


	// <Link to={`/edit/${item.id}`}><button className="btn btn-outline-info my-2 my-sm-0 mr-sm-2" type="submit" value={item.Id} onClick={this.editPost}>Edit</button></Link>
      //           <button className="btn btn-outline-info my-2 my-sm-0 mr-sm-2" type="submit" value={item.id} onClick={this.deletePost}>Delete</button>