import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="nav-item mt-2">
            <a className="nav-link btn btn-outline-primary" href="/auth/google">
              Login With Google <i className="bi bi-google"></i>
            </a>
          </li>
        );
      default:
        return (
          <React.Fragment>
            <li className="nav-item ms-5" style={{ marginTop: "16px" }}>
              <Payments />
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-outline-danger ms-5 "
                href="/api/logout"
                style={{ marginTop: "16px" }}
              >
                Logout
              </a>
            </li>
          </React.Fragment>
        );
    }
  }
  renderCredit() {
    if (this.props.auth) {
      return `Credits : ${this.props.auth.credits}`;
    }
    return;
  }
  renderName() {
    if (this.props.auth) {
      return (
        <p className="lead text-center text-primary">
          WELCOME {this.props.auth.name} !!!!
        </p>
      );
    }
    return;
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light mb-3">
          <div className="container-fluid">
            <Link
              to={this.props.auth ? "/surveys" : "/"}
              className="navbar-brand"
            >
              SurveyTime
            </Link>
            <span>{this.renderCredit()}</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {this.renderContent()}
              </ul>
            </div>
          </div>
        </nav>
        {this.renderName()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
