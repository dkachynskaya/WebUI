import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const baseUrl = 'http://localhost:5000'
//const baseUrl = 'https://jsonplaceholder.typicode.com'

class App extends Component {
  constructor(){
    super();
    this.state = {
      post:null
    }
  }

  componentDidMount(){
    //axios.get(`${baseUrl}/posts/1`).then((res)=>{
      axios.get(`${baseUrl}/api/post/1`).then((res)=>{
      this.setState({
        post:res.data
      });
    }).catch((error)=>{
      alert("There is an error in API call");
    });
  }

  render() {
    return (
      this.state.post!=null &&
      <div>
        <h2>{this.state.post.title}</h2>
        <p>{this.state.post.content}</p>
      </div>
    );
  }
}

export default App;
