import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import add from '../images/add-notes.png';

import { Role } from '../../_helpers';
import { authenticationService } from '../../_services';

const baseUrl = 'http://localhost:4000'

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      countries: [],
      currentUser: null,
			isAdmin: false
    }
  }

  deleteCountry(event) {
    axios.delete(`${baseUrl}/api/countries/${event.target.value}`).then(response => {
      console.log("COMMENTS", response.data);
      debugger;
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
  }

  editCountry(event) {
    axios.delete(`${baseUrl}/api/countries/${event.target.value}`).then(response => {
      console.log("COMMENTS", response.data);
      debugger;
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
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleChange2 = event => {
    this.setState({ info: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const country = {
      name: this.state.name,
      info: this.state.info
    };
    axios.post(`${baseUrl}/api/countries`, country).then(response => {
      axios.get(`${baseUrl}/api/countries`).then((res)=>{
    this.setState({
      countries:res.data
    });
  }).catch((error)=>{
    alert("There is an error in API call");
  });
    }).catch(error => {
      console.log(error);
    });
  
this.props.history.push('/countries');
}

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
			currentUser: x,
			isAdmin: x && x.role === Role.Admin
		}));
    axios.get(`${baseUrl}/api/countries`).then((res) => {
      this.setState({
        countries: res.data
      });
    }).catch((error) => {
      alert("There is an error in API call");
    });
  }

  render() {
    const { isAdmin } = this.state;
    let countries = this.state.countries.map(item => {
      return (
        <div key={item.id} className="col-md-3 p-3 rounded-lg">
          <img src={item.imageUrl} alt="" className="img-fluid rounded-circle" />
          <Link to={`/countries/${item.id}`}><h1 className="text-center">{item.name}</h1></Link>
        </div>
      );
    });

    return (
      <div>
        {isAdmin && <Link to="/create_new_country">
          <img src={add} width="40" height="40" className="float-right mr-4" data-toggle="tooltip" data-html="true" title="Додати країну" alt="add-button"/>
        </Link>  
        }  
        <div className="container">
          <div className="row">
            {countries}
          </div>
        </div>


        <div class="modal fade" id="createCountry" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Додати країну</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                <div class="form-group">
                  <label for="name">Назва країни</label>
                  <input type="textarea" class="form-control" id="name" />
                </div>
                <div class="form-group">
                  <label for="info">Інформація про країну</label>
                  <textarea className="form-control mb-2" row="4" id="info" />
                </div>
                    <div class="form-group">
                      <label for="imageUrl">URL зображення</label>
                      <input type="password" class="form-control" id="imageUrl"/>
                    </div>
                  </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Скасувати</button>
                <button type="submit" class="btn btn-primary" onSubmit={this.handleSubmit.bind(this)}>Підтвердити</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Countries;