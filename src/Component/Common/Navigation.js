import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';

class Navigation extends React.Component{

    render(){
        return(
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg navbar-dark navnew">
                    <div className="collapse navbar-collapse">
                        <div>
                            <Link to="/" className="navbar-brand p-0">TecRidge</Link>
                        </div>
                        <div>
                            <ul className="navbar-nav navbar-right mr-auto mt-2 mt-lg-0">
                                <li>
                                    <Link to="/path" className="nav-link">Map</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navigation;