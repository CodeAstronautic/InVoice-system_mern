import React, { Component } from 'react';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import NavBar from '../../Layout/NavBar/NavBar';
//import invoice from '../invoice/invoice';

class InvoiceList extends Component {

  state = {
    isMonth: false,
    isWeek: false,
    isClientName: false,
    isCreatedTime: false ,
    isInvoiceDate: false ,
    isBankAccount: false,
    isSentVia: false,
    isUsd: false,
    isReleasedDate: false ,
    isReleasedInr: false,
    isDocument: false ,
    invoiceData: []
  };

  toggleChangeM = () => {
    this.setState(prevState => ({
      isMonth: !prevState.isMonth,
    }));
  }

  toggleChangeW = () => {
    this.setState(prevState => ({
      isWeek : !prevState.isWeek,
    }));
  }

  toggleChangeCN = ()  => {
     this.setState(prevState => ({
       isClientName : !prevState.isClientName,
     }));
  }

toggleChangeCT = () => {
  this.setState(prevState => ({
    isCreatedTime : !prevState.isCreatedTime,
  })) ;
}

toggleChangeID = () => {
  this.setState(prevState => ({
    isInvoiceDate : !prevState.isInvoiceDate,
  }))
}

toggleChangeBA = () => {
  this.setState(prevState => ({
    isBankAccount : !prevState.isBankAccount,
  }));
}

toggleChangeU = () => {
  this.setState(prevState => ({
    isUsd : !prevState.isUsd,
  })) ;
}

toggleChangeSV = () => {
  this.setState(prevState => ({
    isSentVia : !prevState.isSentVia,
  }))
}

toggleChangeRD = () => {
  this.setState(prevState=> ({
    isReleasedDate: !prevState.isReleasedDate ,
  }))
}

toggleChangeRI = () => {
  this.setState(prevState => ({
    isReleasedInr : !prevState.isReleasedInr
  }))
}
toggleChangeD = () => {
  this.setState(prevState => ({
    isDocument : !prevState.isDocument
  }))
}

onSubmit = (e) => {
    e.preventDefault();
    let arr = [];
    for (var key in this.state) {
      if(this.state[key] === true) {
        arr.push(key);
      }
    }
    axios.get('http://localhost:8000/api/invoice')
    .then(res => this.setState({invoiceData: res.data}));
}
invoiceList() {
  return this.state.invoiceData.map(newInvoice => {
return  <tr>
          <th>Month</th>
         {this.state.isMonth &&     <td>{newInvoice.month}{this.state.month}</td>}
         <th>Week</th>
        {this.state.isWeek &&<td>{newInvoice.week}</td>}
        <th>Client Name</th>
        {this.state.isClientName && <td>{newInvoice.client_name}</td>}
        <th>Invoice Date</th>
        {this.state.isInvoiceDate && <td>{newInvoice.invoice_date}</td>}
        <th>Created Time</th>
        {this.state.isCreatedTime && <td>{newInvoice.created_time}</td>}
        <th>Bank Account</th>
        {this.state.isBankAccount && <td>{newInvoice.bank_account}</td>}
        <th>Sent Via</th>
        {this.state.isSentVia &&<td>{newInvoice.sent_via}</td>}
        <th>USD</th>
        {this.state.isUsd &&<td>{newInvoice.usd}</td>}
        <th>REleased Date</th>
        {this.state.isReleasedDate && <td>{newInvoice.released_date}</td>}
        <th>Released INR</th>
        {this.state.isReleasedInr &&<td>{newInvoice.released_inr}</td> }
        <th>Document</th>
        {this.state.isDocument &&<td>{newInvoice.document}</td> }
      </tr>
    // return <Invoice invoice={newInvoice} checkbox={this.state}  key={newInvoice._id}/>;
  })
}
render() {
    return (
      <div>
        <NavBar />
        <h2>Show the Data</h2>
        <hr />
        <form onSubmit = {this.onSubmit}>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isMonth}
                onChange={this.toggleChangeM}
                className="form-check-input"
              />
              Month
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isWeek}
                onChange={this.toggleChangeW}
                className="form-check-input"
              />
            Week
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isClientName}
                onChange={this.toggleChangeCN}
                className="form-check-input"
              />
            Client Name
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isCreatedTime}
                onChange={this.toggleChangeCT}
                className="form-check-input"
              />
           Created Time
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isInvoiceDate}
                onChange={this.toggleChangeID}
                className="form-check-input"
              />
                Invoice Data
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isBankAccount}
                onChange={this.toggleChangeBA}
                className="form-check-input"
              />
           Bank account
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isUsd}
                onChange={this.toggleChangeU}
                className="form-check-input"
              />
           USD
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isSentVia}
                onChange={this.toggleChangeSV}
                className="form-check-input"
              />
          Sent via
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isReleasedDate}
                onChange={this.toggleChangeRD}
                className="form-check-input"
              />
          Released Date
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isReleasedInr}
                onChange={this.toggleChangeRI}
                className="form-check-input"
              />
         Released INR
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                checked={this.state.isDocument}
                onChange={this.toggleChangeD}
                className="form-check-input"
              />
         Document
            </label>
          </div>
          <div className="form-group">
            <button >
              Submit
            </button>
          </div>
          <Link to='/'>Back</Link>
        </form>

        <table className="table" border="5" bgcolor="lightblue">
          <tbody>
            { this.invoiceList() }
          </tbody>
          </table>
      </div>
    );
  }
}

export default InvoiceList;


