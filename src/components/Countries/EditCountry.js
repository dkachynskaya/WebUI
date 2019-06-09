import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseUrl = 'http://localhost:4000';

class EditCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: { }
    }
  }

  componentDidMount() {
    var { match } = this.props;
    let Id = match.params.id;

    axios.get(`${baseUrl}/api/countries/` + Id).then((res) => {
      this.setState({
        country: res.data
      });
    }).catch((error) => {
      alert("There is an error in API call");
    });
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

  handleSubmit = (event) => {
    event.preventDefault();
    var { match } = this.props;
    let Id = match.params.id;

    const country = {
      name: this.state.name,
      info: this.state.info,
      imageUrl: this.state.url

    }

    axios.put(`${baseUrl}/api/countries/` + Id, country).then(response => {
      console.log(response);
      axios.get(`${baseUrl}/api/countries/`).then((res) => {
        this.setState({
          country: res.data
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
          <form onSubmit={(event) => {this.handleSubmit(event)}} className="col-md-4 mx-auto mb-5">
            <div class="form-group">
              <label for="name">Назва країни</label>
              <input type="textarea" class="form-control" id="name" onChange={(event) => { this.nameChange(event) }} defaultValue={this.state.country.name} />
            </div>
            <div class="form-group">
              <label for="info">Інформація про країну</label>
              <textarea className="form-control" row="4" id="info" onChange={(event) => { this.infoChange(event) }} defaultValue={this.state.country.name} />
            </div>
            <div class="form-group">
              <label for="imageUrl">URL зображення</label>
              <input type="textarea" class="form-control" id="imageUrl" onChange={(event) => { this.urlChange(event) }} defaultValue={this.state.country.imageUrl} />
            </div>
            <Link to="/countries"><button className="btn btn-outline-info my-2 my-sm-0 mb-5 float-right" type="cancel">Скасувати</button></Link>
            <button className="btn btn-outline-info my-2 my-sm-0 mb-5 float-right mr-2" type="submit">Зберегти зміни</button>
          </form>
        </div>
      </div>
      );
    }
}

export default EditCountry;