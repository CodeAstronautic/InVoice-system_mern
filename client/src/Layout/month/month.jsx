import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createMonth } from "../../actions/monthActions";
import { Link } from "react-router-dom";
class Month extends Component {
  state = {
    month: "",
  };
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated) this.props.history.push("/");
  }

  onChangeHandler = (e) => this.setState({ month: e.target.value });

  onSubmit = async (e) => {
    e.preventDefault();
    const { month } = this.state,
      newMonth = { month };
    // Redux function
    this.props.createMonth(newMonth, this.props.history);
  };
  render() {
    //const { errors } = this.state;
    return (
      <div className="Private-Wrapper">
        <center>
          <h3>Create New Month</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Month: </label>
              <input
                type="number"
                required
                className="form-control"
                name="month"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Create Month"
                className="btn btn-primary"
              />
            </div>
            <Link to="/invoice">Back</Link>
          </form>
        </center>
      </div>
    );
  }
}

Month.propTypes = {
  createMonth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //  errors: PropTypes.object.isRequired
};

//export default connect(mapStateToProps, { registerUser })(withRouter(Register));

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createMonth })(withRouter(Month));
