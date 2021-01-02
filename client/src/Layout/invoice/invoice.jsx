import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createInvoice   } from '../../actions/invoiceActions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import NavBar from '../../Layout/NavBar/NavBar';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';


class Invoice extends Component {
  state = {
    month : "" ,
    week : "" ,
    client_name : "" ,
    invoice_date : new Date() ,
    created_time : new Date(),
    bank_account: "" ,
    usd : "" ,
    sent_via : "" ,
    released_inr : "" ,
    released_date : new Date() ,
    selectedFile: null ,
    months : [] ,
    weeks : [],
    errors: {}
  };

componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated) this.props.history.push('/');
    axios.get('http://localhost:8000/api/month')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          months: response.data.map(user => user.month),
          username: response.data[0].username
        })
      }
    })
  }

componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated) this.props.history.push('/');
    axios.get('http://localhost:8000/api/week')
    .then(response => {
      if (response.data.length >0) {
        this.setState({
          weeks: response.data.map(user => user.week),
          username: response.data[0].username
        })
      }
    })
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.errors)
      this.setState({ errors: nextProps.errors });
  }

onChangeHandler = e => this.setState({
    [e.target.name]: e.target.value  ,
  } );

onChangeMonth = e =>
    this.setState({
      month: e.target.value
    })

onChangeWeek = e =>
    this.setState({
     week: e.target.value
    })

onChangeClientName=e =>
    this.setState({
      client_name: e.target.value
    })

onChangeInvoiceDate=date => {
    this.setState({
      invoice_date: date
    })
  }
onChangeCreatedTime=date =>
    this.setState({
     created_time: date
    })

onChangeBankAccount=e =>
    this.setState({
      bank_account:e.target.value
    })

onChangeUSD =e =>
    this.setState({
     usd: e.target.value
    })

onChangeSentVia  =e =>
    this.setState({
      sent_via: e.target.value
    })

onChangeReleasedDate= date =>
    this.setState({
      released_date: date
    })

onChangeReleasedInr =e =>
    this.setState({
      released_inr: e.target.value
    })

fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
    console.log(this.state.selectedFile)
  }

 onSubmit = async e => {
      e.preventDefault();
     const formData = new FormData();
     formData.append('file',this.state.selectedFile);
      const { month, week,client_name ,  invoice_date ,  created_time ,  bank_account  ,  usd ,  sent_via ,  released_inr , released_date  } = this.state,
       newInvoice = { month, week,client_name ,  invoice_date ,  created_time ,  bank_account   ,  usd ,  sent_via ,  released_inr , released_date } ;
       // Redux function
       Object.keys(newInvoice).forEach(key => {
         formData.append(key, newInvoice[key])
       })
    this.props.createInvoice(formData, this.props.history);
  };

  render() {
    return (
      <MDBContainer>
     <NavBar />
      <MDBRow>
<MDBCol md="6">
        <Button variant="contained" ><Link to="/month">Month</Link></Button>
         <br />
        <Button variant="contained" ><Link to="/week">Week</Link></Button>
         <p className="h4 text-center mb-4">Create Invoice Page </p>
        <form onSubmit={this.onSubmit}>
        <label>Month: </label>
          <select ref="userInput"
                className="form-control"
               name="month"
                onChange={this.onChangeMonth}>
              {
                  this.state.months.map(function(month) {
                  return <option
                    key={month}
                    value={month}>{month}
                    </option>;
                })
              }
          </select>
          <br />
          <label>Week :</label>
          <select ref="userInput"
                className="form-control"
             name="week"
              onChange={this.onChangeWeek}>
              {
                this.state.weeks.map(function(week) {
                  return <option 
                    key={week}
                    value={week}>{week}
                    </option>;
                })
              }
          </select>
          <label>Client Name</label>
          <TextField 
              type="text" 
              className="form-control"
             name="client_name"
              onChange={this.onChangeClientName}
              />
          <label>Invoice Date </label>
            <DatePicker
             name="invoice_date"
             selected ={this.state.invoice_date}
              onChange={this.onChangeInvoiceDate}
            />
        <br />
          <label>Created Time </label>
            <DatePicker
              selected ={this.state.created_time}
              onChange={this.onChangeCreatedTime}
            />
        <br />
          <label>Bank Account </label>
          <TextField 
              type="number" 
              className="form-control"
             name="bank_account"
              onChange={this.onChangeBankAccount}
              />
       
<br/>
          <label>USD ($)</label>
          <TextField 
              type="text" 
              className="form-control"
             name="usd"
              onChange={this.onChangeUSD}
              />
       <br />
       
          <label>Sent Via</label>
          <TextField 
              type="text" 
              className="form-control"
             name="sent_via"
              onChange={this.onChangeSentVia}
              />
              <br />
       
          <label>Released Date </label>
            <DatePicker 
             selected ={this.state.released_date}
            onChange={this.onChangeReleasedDate} />
<br />
          <label>Released INR</label>
          <TextField 
              type="number" 
              className="form-control"
             name="released_inr"
              onChange={this.onChangeReleasedInr}
              />
       <br />
          <label>File Upload </label>
        <TextField type="file" onChange={this.fileChangedHandler} />
        
        <br />
        <button variant="contained" color="primary">Submit</button>
         </form>
     
         </MDBCol>
  </MDBRow>
         </MDBContainer>
    )
  }
}

Invoice.propTypes = {
 createInvoice: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps , { createInvoice})(withRouter(Invoice));