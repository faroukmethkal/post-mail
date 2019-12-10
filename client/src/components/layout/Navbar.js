import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="nav nav-tabs">
       <li className="nav-item ">
        <Link className='nav-link text-danger ' to='/deletecompany'>Delete Edit Company</Link>
      </li>
      <li className="nav-item " >
        <Link className='nav-link text-success' to='/addCompany'>Add New Company</Link>
      </li>
      <li className="nav-item ">
        <Link className='nav-link ' to='/dashboard'>Search Bar</Link>
      </li>
           <li className="nav-item ">
        <a className='nav-link text-secondary' onClick={logout} href='#!'>
             Logout
        </a>
        
      </li>
   
      
    </ul>
  );

  const guestLinks = (
    <ul className="nav nav-tabs">
    
    
      <li className="nav-item">
        <Link className='nav-link active' to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <div className="container">

          <nav className='navbar navbar-dark bg-light'>
   <span className="badge badge-danger text-wrap"> 
     <h3>
        <i className="nav-link" href="#!"> Den Gode by-Post Mail</i>
      </h3>
     </span>  
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
    </div>

  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps, {logout}
)(Navbar);
