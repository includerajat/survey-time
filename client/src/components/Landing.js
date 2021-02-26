import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { Link } from "react-router-dom";

function Landing(props) {
  const renderButton = () => {
    if (props.auth) {
      return (
        <Link className="btn btn-primary" to="/surveys">
          Go To Dashboard
        </Link>
      );
    } else if (props.auth === false) {
      return (
        <React.Fragment>
          <a
            style={{ width: "60%" }}
            className="nav-link btn btn-outline-primary mx-auto"
            href="/auth/google"
          >
            Login With Google <i className="bi bi-google"></i>
          </a>
          <p className="lead mt-3">
            First Time Login ? If yes then you will get free 2 credits.
          </p>
        </React.Fragment>
      );
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>SurveyTime!</h1>
      <p className="lead">
        What is problem in our Company ? !!! <br />
        Why are customers not connect with our Company ? !! <br />
        Ok do one thing <strong>Survey</strong> <br />
        It's Survey Time
      </p>
      {renderButton()}
    </div>
  );
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, { fetchUser })(Landing);
