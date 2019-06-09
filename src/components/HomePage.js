import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { userService, authenticationService } from '../_services';
import axios from 'axios';

const baseUrl = 'http://localhost:4000';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            title: '',
            content: '',
            url: '',
            countryId: '',
            countries: []
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
        axios.get(`${baseUrl}/api/countries`).then((res) => {
            this.setState({
              countries: res.data
            });
          }).catch((error) => {
            alert("There is an error in API call");
          });
    }

    nameChange = event => {
        this.setState({ title: event.target.value });
      }
    
      infoChange = event => {
        this.setState({ content: event.target.value });
      }
    
      urlChange = event => {
        this.setState({ url: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    
        const post = {
          title: this.state.title,
          content: this.state.content,
          imageUrl: this.state.url,
          userId: currentUser.id,
          authorName: currentUser.firstName + currentUser.lastName,
          countryId: this.state.id
        };
    
        axios.post(`${baseUrl}/api/posts`, post).then(response => {
          axios.get(`${baseUrl}/api/posts`).then((res) => {
            this.setState({
              posts: res.data
            });
          }).catch((error) => {
            alert("There is an error in API call");
          });
        }).catch(error => {
          console.log(error);
        });
    
        this.props.history.push('/blog');
      }

    render() {
        const { currentUser, userFromApi } = this.state;
        let countries = this.state.countries.map(item => {
            return (
              <div key={item.id} className="col-md-3 p-3 rounded-lg">
                <img src={item.imageUrl} alt="" className="img-fluid rounded-circle" />
                <Link to={`/countries/${item.id}`}><h1 className="text-center">{item.name}</h1></Link>
              </div>
            );
          });
        return (
            <div className="container">
                {userFromApi && <h1 className="mb-2">Вітаємо, {userFromApi.firstName} {userFromApi.lastName}! </h1>}
                <p>Ви увійшли до особистого кабінету.</p>
                <p>Ви маєте право доступу: <strong>{currentUser.role}</strong>.</p>
                <div className="row">
                    <h2 className="mx-auto mb-5">Додати пост</h2>
                </div>
                <div className="row">
                    <form onSubmit={(event) => { this.handleSubmit(event) }} className="col-md-4 mx-auto mb-5">
                        <div class="form-group">
                            <label for="name">Назва</label>
                            <input type="textarea" class="form-control" id="name" onChange={(event) => { this.nameChange(event) }} />
                        </div>
                        <div class="form-group">
                            <label for="info">Контент</label>
                            <textarea className="form-control" row="4" id="info" onChange={(event) => { this.infoChange(event) }} />
                        </div>
                        <div class="form-group">
                            <label for="imageUrl">URL зображення</label>
                            <input type="textarea" class="form-control" id="imageUrl" onChange={(event) => { this.urlChange(event) }} />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Країна</label>
                            <select class="form-control" id="exampleFormControlSelect1" >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <Link to="/blog"><button className="btn btn-outline-info my-2 my-sm-0 mb-5 float-right" type="cancel">Скасувати</button></Link>
                        <button className="btn btn-outline-info my-2 my-sm-0 mb-5 float-right mr-2" type="submit">Додати</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default HomePage;