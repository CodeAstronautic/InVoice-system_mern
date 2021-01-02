import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../Layout/NavBar/NavBar';
import users from '../Users/users';
const Users = props => (

  <tr>
      <th>name</th>
    <td>{props.user.name}</td>
    <th>phone</th>
    <td>{props.user.phone}</td>
    <th>Email</th>
    <td>{props.user.email}</td>
    <th>Address</th>
    <td>{props.user.address}</td>
    <th>Profile</th>
    <td>{props.user.profile}</td>
    <th>Created Date</th>
    <td>{props.user.added_date}</td>    
  </tr>
)

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
  }

  componentDidMount() {
      console.log(users)
    axios.get('http://localhost:8000/api/users')
      .then(response => {
        this.setState({ users : response.data })
      })
      .catch((error) => {
       // console.log(error);
      })
  }

  userList() {
    return this.state.users.map(newUser => {
      return <Users user={newUser}  key={newUser._id}/>;
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <h3>User List</h3>
<br />
        <table className="table" border="4" bgcolor="lightblue">
         
          <tbody>
            { this.userList() }
          </tbody>
        
        </table>
      </div>
    )
  }
}




