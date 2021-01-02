import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
//import Error from "../Error/Error";
import { TextField, Button } from "@material-ui/core";
//import Button from

const hStyle = { color: "maroon" };
class Login extends Component {
  state = {
    email: "",
    password: "",
    // errors: {}
  };

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) this.props.history.push("/");
  }

  onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

  signIn = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const { email, password } = this.state;
    // Redux function
    if (await this.props.loginUser({ email, password }))
      this.props.history.push("/");
  };
  render() {
    return (
      <div className="Login-Wrapper">
        <div className="Login-SubWrapper">
          <center>
            <Link to="/">
              {" "}
              <span
                className="fa fa-arrow-left"
                style={{ color: "#333", fontSize: "15px" }}
              ></span>{" "}
            </Link>
            <h1 style={hStyle} className="Login-Form-Title">
              Master Login
            </h1>
            <div className="hr" />
            <form onSubmit={this.signIn}>
              <TextField
                type="email"
                placeholder="Email"
                name="email"
                autoComplete="email"
                onChange={this.onChangeHandler}
              />
              <br />
              <TextField
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                onChange={this.onChangeHandler}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="Login-Button"
              >
                Sign In
              </Button>
            </form>
          </center>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  //errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
