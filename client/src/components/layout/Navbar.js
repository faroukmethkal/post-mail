import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="nav nav-tabs">
      <li className="nav-item " >
        <Link className="nav-link " to="/dashboard">
          Home
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link text-success" to="/addCompany">
          Add New Company
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link text-danger " to="/deletecompany">
          Delete Company
        </Link>
      </li>

      <li className="nav-item ">
        <a className="nav-link text-secondary" onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link active" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="container">
      <nav 
        style={{
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          boxShadow: "0 10px 7px #555"
        }}
        className="navbar navbar-dark bg-info"
      >
        <span className="badge badge-danger text-wrap">
          <h3>
            <i className="nav-link" href="#!">
              {" "}
              Den Gode By - Post Mail
            </i>
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

export default connect(mapStateToProps, { logout })(Navbar);
