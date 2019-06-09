import React, { Component } from 'react';


class Footer extends Component {
    render() {
        return (
            <div className="navbar-fixed-bottom bg-secondary fixed row-fluid footer">
                <div className="navbar-inner">
                    <div className="container">
                        <div className="footer-copyright text-center py-3 text-white">
                            © 2019 Автор: Качинська Дар'я, група ЗПІзп-71
                        </div>
                    </div>
                </div>
            </div>        
        );
    }
}

export default Footer;