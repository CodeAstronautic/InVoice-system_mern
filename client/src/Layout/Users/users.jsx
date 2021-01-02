import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser ,  } from '../../actions/userActions';
import { TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import NavBar from '../../Layout/NavBar/NavBar';
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';

class User extends Component {

  state = {
    name: "",
    email: "",
    phone: "",
    password: "" ,
    address: "" ,
    selectedFile: null ,
  //  isActive : false ,
  //  errors: {}
  };
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated) this.props.history.push('/');
  }
  
  
  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });
  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
   // console.log(this.state.selectedFile)
  }

  onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file',this.state.selectedFile);
   // console.log(this.state)
    const { name, email,phone , password , address} = this.state,
       newUser = { name, email, phone ,password , address };
    // Redux function
    Object.keys(newUser).forEach(key => {
      formData.append(key, newUser[key])
    })
    this.props.createUser(formData, this.props.history);
  };
  render() {
//const { errors } = this.state;
    return (
      <MDBContainer>
          <NavBar />
          <MDBRow>
    <MDBCol md="6">
         <form onSubmit={this.onSubmit}>
         <p className="h4 text-center mb-4">Add User </p>
         <label>
          Your name
        </label>
         <TextField type="text" className="form-control"   placeholder="enter name" name="name" onChange={this.onChangeHandler} value={this.name} required />
         <br />
         <label>Email</label>
         <TextField type="email" className="form-control" placeholder="enter email" name="email" onChange={this.onChangeHandler} value={this.email} required />
         <br />
         <label>Phone</label>
         <TextField type="number" className="form-control" placeholder="enter number" name="phone" onChange={this.onChangeHandler} value={this.phone} required />
         <br />
         <label>Password</label>
         <TextField type="password"className="form-control"  placeholder="enter password" name="password" onChange={this.onChangeHandler} value={this.password}  required />
         <br />
         <label>Address</label>
         <TextField type="text"className="form-control"  placeholder="enter address" name="address" onChange={this.onChangeHandler} value={this.address}  required />
         <br />
         <div className="form-group">
          <label>File Upload </label>
        <TextField type="file" className="form-control"  onChange={this.fileChangedHandler} />

         </div>
         <div className="text-center mt-4">
          <button bgcolor="indigo" type="submit">Add</button>
        </div>
         <Link to='/'>Back</Link>
         </form>
         </MDBCol>
  </MDBRow>
         </MDBContainer>
    )
  }
}




User.propTypes = {
 createUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,


//  errors: PropTypes.object.isRequired
};


//export default connect(mapStateToProps, { registerUser })(withRouter(Register));

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps , {createUser})(withRouter(User));