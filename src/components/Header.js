import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom'; 
import logo from './logo.png';

class Header extends Component {
	render(){
        return (
			<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
				<a className="navbar-brand" href="/">
    				<img src={logo} width="30" height="30" alt="" className="d-inline-block align-top" />
    				TraveLove
  				</a>
				<div className="collapse navbar-collapse" id="navbarColor01">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active"><Link className="nav-link" to="/">Блог</Link></li>
						<li className="nav-item"><Link className="nav-link" to="/teachers">Автори</Link></li>
						<li className="nav-item"><Link className="nav-link" to="/about">Про нас</Link></li>						
						<li className="nav-item"><Link className="nav-link" to="/courses">Контакти</Link></li>
						<li className="nav-item"><Link className="nav-link" to="/create">Create</Link></li>
					</ul>
					
					<form className="form-inline">
						<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
					</form>
				</div>				
			</nav>	
		);
    }  
}

export default Header;
