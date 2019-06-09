import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../_services';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <h1>Admin</h1>
                <p>This page can only be accessed by administrators.</p>
                <div>
                    All users from secure (admin only) api end point:
                    {users &&
                        <ul>
                            {users.map(user =>
                                <li key={user.id}>{user.firstName} {user.lastName}</li>
                            )}
                        </ul>
                    }
					
					<Link to="/create_new_user"><button className="btn btn-outline-info my-2 my-sm-0" type="submit">Створити нового користувача</button></Link>
                </div>
            </div>
        );
    }
}

export default AdminPage;