import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createWeek } from "../../actions/weekActions";
import { Link } from "react-router-dom";

class Week extends Component {
  state = {
    week: "",
    //  errors: {}
  };
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated) this.props.history.push("/");
  }
  onChangeHandler = (e) => this.setState({ week: e.target.value });

  onSubmit = async (e) => {
    e.preventDefault();

    const { week } = this.state,
      newWeek = { week };
    // Redux function
    this.props.createWeek(newWeek, this.props.history);
  };
  render() {
    //const { errors } = this.state;
    return (
      <div className="Private-Wrapper">
        <center>
          <h3>Create New Week</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Week: </label>
              <input
                required
                className="form-control"
                name="week"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Create Week"
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

Week.propTypes = {
  createWeek: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createWeek })(withRouter(Week));
