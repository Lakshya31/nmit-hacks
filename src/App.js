import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navigation from "./Component/Common/Navigation";
import Dashboard from "./Component/Dashboard/Dashboard"
import Path from "./Component/Path/Path"
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navigation />
        </div>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/path' component={Path} />
      </Router>
    </div>
  );
}

export default App;