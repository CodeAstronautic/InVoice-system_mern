import React, { Component } from "react";

import NavBar from '../../Layout/NavBar/NavBar';
//import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="Home-Content">
          <h1>Invoice System</h1>    
        
        </div>
        <footer>hey this is footer</footer>
      </div>
    );
  }
}

export default Home;
