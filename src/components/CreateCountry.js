import React, { Component } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

const baseUrl = 'http://localhost:4000'

class CreateCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      info: '',
      url: ''
    }
  }

  nameChange = event => {
    this.setState({ name: event.target.value });
  }

  infoChange = event => {
    this.setState({ info: event.target.value });
  }

  urlChange = event => {
    this.setState({ url: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const country = {
      name: this.state.name,
      info: this.state.info,
      imageUrl: this.state.url
    };

    axios.post(`${baseUrl}/api/countries`, country).then(response => {
      axios.get(`${baseUrl}/api/countries`).then((res) => {
        this.setState({
          countries: res.data
        });
      }).catch((error) => {
        alert("There is an error in API call");
      });
    }).catch(error => {
      console.log(error);
    });

    this.props.history.push('/countries');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="mx-auto mb-5">Додати країну</h2>
        </div>  
        <div className="row">
          <form onSubmit={this.handleSubmit.bind(this)} className="col-md-4 mx-auto mb-5">
            <div class="form-group">
              <label for="name">Назва країни</label>
              <input type="textarea" class="form-control" id="name" onChange={(event) => {this.nameChange(event)}} />
            </div>
            <div class="form-group">
              <label for="info">Інформація про країну</label>
              <textarea className="form-control" row="4" id="info" onChange={(event) => {this.infoChange(event)}} />
            </div>
            <div class="form-group">
              <label for="imageUrl">URL зображення</label>
              <input type="textarea" class="form-control" id="imageUrl" onChange={(event) => {this.urlChange(event)}} />
            </div>
            <button className="btn btn-outline-info my-2 my-sm-0 mb-5" type="submit">Додати</button>
            <button className="btn btn-outline-info my-2 my-sm-0 mb-5" type="cancel">Скасувати</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCountry;