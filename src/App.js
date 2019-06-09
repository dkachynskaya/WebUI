import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import logo from './components/images/logo.png';

import { history, Role } from './_helpers';
import { authenticationService } from './_services';
import { PrivateRoute } from './_components/PrivateRoute';

// App components
import Home from './components/Home';
import Countries from './components/Countries/Countries';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import NotFound from './components/NotFound';
import Footer from './components/Footer/Footer';
import PostPage from './components/PostPage';
import CountryPage from './components/Countries/CountryPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import CreateCountry from './components/Countries/CreateCountry';
import CreateUser from './components/CreateUser';
import EditCountry from './components/Countries/EditCountry';


import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: null,
			isAdmin: false
		};
	}

	componentDidMount() {
		authenticationService.currentUser.subscribe(x => this.setState({
			currentUser: x,
			isAdmin: x && x.role === Role.Admin
		}));
	}

	logout() {
		authenticationService.logout();
		history.push('/login');
	}

	render() {
		const { currentUser, isAdmin } = this.state;
		return (
			<Router history={history}>
				<div>
					<nav className="navbar navbar-expand-lg bg-dark-purple shadow menu mb-4">
						<a className="navbar-brand" href="/blog">
							<img src={logo} width="40" height="40" alt="" className="d-inline-block align-top" style={{ marginRight: 10 + 'px' }} />
							<span style={{ lineHeight: 35 + 'px' }}>TraveLife</span>
						</a>
						<div className="navbar-nav mr-auto" >
							<Link className="nav-item nav-link menu" to="/blog">Блог</Link>
							<Link className="nav-item nav-link" to="/countries">Країни</Link>
							<Link className="nav-item nav-link" to="/about">Про нас</Link>
							<Link className="nav-item nav-link" to="/contacts">Контакти</Link>
							<Link className="nav-item nav-link" to="/">Особистий кабiнет</Link>
							{isAdmin && <Link to="/admin" className="nav-item nav-link">Користувачі</Link>}
							{currentUser && <a onClick={this.logout} className="nav-item nav-link">Вихiд</a>}		
						</div>
						

					</nav>
					
					<Switch>
						<Route exact path="/blog" component={Home} />
						<Route exact path="/countries" component={Countries} />
						<Route path="/about" component={About} />
						<Route path="/contacts" component={Contacts} />
						<PrivateRoute exact path="/" component={HomePage} />
						<PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/blog/:id" component={PostPage} />
						<Route path="/countries/:id" component={CountryPage} />
						<PrivateRoute path="/create_new_country" roles={[Role.Admin]} component={CreateCountry} />
						<Route path="/create_new_user" component={CreateUser} />
						<PrivateRoute path="/edit_country/:id" component={EditCountry} />
						<Route component={NotFound} />
					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}
}

//const baseUrl = 'http://localhost:5000'
//const baseUrl = 'https://jsonplaceholder.typicode.com'
//const baseUrl = 'http://localhost:8080'

//class App extends Component {
//constructor(){
//super();
//this.state = {
//post:null
// }
//}

//componentDidMount(){
//axios.get(`${baseUrl}/api/post/1`).then((res)=>{
//  	axios.get(`${baseUrl}/api/users/1`).then((res)=>{
//this.setState({
//post:res.data
//});
//}).catch((error)=>{
//alert("There is an error in API call");
//});
//}

// render() {
// return (		
// 	this.state.post!=null &&
//	<div>
//	<h2>{this.state.post.name}</h2>
//<p>{this.state.post.age}</p>
//</div>
//);
//}
//}

export default App;