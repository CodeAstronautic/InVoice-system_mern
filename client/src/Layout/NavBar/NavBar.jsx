import React, { Component, Fragment } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Button from "@material-ui/core/Button";
class NavBar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(user.role);
    const authLinks = (
      <div>
        <Link to="/login">Master login</Link>
      </div>
    );
    const guestLinks = (
      <div>
        {user.role && (
          <Button variant="contained">
            <Link to="/user">Add user</Link>
          </Button>
        )}
        <Button variant="contained">
          <Link to="/invoice">Create Invoice</Link>
        </Button>
        <Button variant="contained">
          <Link to="/data">All invoice Data</Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.logoutUser}
        >
          <span className="fa fa-sign-out"></span> Logout
        </Button>
      </div>
    );
    return (
      <nav className="NavBar-Wrapper">
        <div className="User-Info-Wrapper">
          {Object.keys(user).length > 0 && (
            <Fragment>
              <img src={user.profile} alt="" className="User-Avatar" />
              <p className="User-Name">{user.name}</p>
            </Fragment>
          )}
        </div>
        <div>{isAuthenticated ? guestLinks : authLinks}</div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
