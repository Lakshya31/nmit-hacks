import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navigation from "./Component/Common/Navigation";
import Dashboard from "./Component/Dashboard/Dashboard"
import Path from "./Component/Path/Path"
import Rout from "../Component/Route/Rout"
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
        <Route exact path='/map' component={Path} />
        <Route exact path='/route/:rid' component={Rout} />
      </Router>
    </div>
  );
}

export default App;
