import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import Home from '../Layout/Home/Home';
import SignIn from '../Layout/SignIn/SignIn';
import SignUp from '../Layout/SignUp/SignUp';
import Users from '../Layout/Users/users';
import Invoice from '../Layout/invoice/invoice'
import Month from '../Layout/month/month'
import week from '../Layout/week/week'
import InvoiceList from '../Layout/dataInvoice/DataInvoice'
import userData from '../Layout/userData/userData'

const Routes = () => (
  <Fragment>
    <Switch>
      <Route path="/" component={ Home , userData} exact />
      <Route path="/register" component={ SignUp } exact/>
      <Route path="/login" component={ SignIn } exact />
      <Route path="/user" component={ Users } exact />
      <Route path="/invoice" component={ Invoice} exact />
      <Route path="/month" component={ Month} exact />
      <Route path='/week' component={ week } exact />
      <Route path='/data' component={ InvoiceList } exact />
    </Switch>
  </Fragment>
);

export default Routes;


