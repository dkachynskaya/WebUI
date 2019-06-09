import React, { Component } from 'react';
import axios from 'axios';
import { history, Role } from '../../_helpers';
import { authenticationService } from '../../_services';
import { Link } from 'react-router-dom';
import edit from '../images/edit-notes.png';

const baseUrl = 'http://localhost:4000'

class CountryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: {},
      posts: [],
      title: '',
      content: '',
      currentUser: null,
      isAdmin: false
    }
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.role === Role.Admin
    }));
    var { match } = this.props;
    let Id = match.params.id;
    axios.get(`${baseUrl}/api/countries/` + Id).then((res) => {
      this.setState({
        country: res.data
      });
    }).catch((error) => {
      alert("There is an error in API call");
    });


    axios.get(`${baseUrl}/api/posts/country/` + Id).then((res) => {
      this.setState({
        posts: res.data
      });
    }).catch((error) => {
      alert("There is an error in API call");
    });
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    var { match } = this.props;
    let Id = match.params.id;

    let posts = this.state.posts.map(item => {
      return (
        <div key={item.id}>
          <Link to={`/blog/${item.id}`}><h3> {item.title}</h3></Link>
          <div className="text-justify">{item.date}</div>
          <hr />
        </div>
      );
    });


    return (
      <div>
        
        {isAdmin && <Link to={`/edit_country/${this.state.country.id}`}>
          <img src={edit} width="40" height="40" className="float-right mr-4" data-toggle="tooltip" data-html="true" title="Редагувати країну" alt="add-button" />
        </Link>
        }
        <div className="container">
          <div className="row">
            <h1 className="mx-auto mb-3">{this.state.country.name}</h1>
          </div>
          <div className="row">
            <img src={this.state.country.imageUrl} className="mx-auto mb-3" />
            <p> {this.state.country.info}</p>
          </div>
          <div>
            {posts}
          </div>

        </div>
      </div>
    );
  }
}

export default CountryPage;

