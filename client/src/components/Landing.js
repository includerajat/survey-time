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
    } else {
      return (
        <a
          style={{ width: "60%" }}
          className="nav-link btn btn-outline-primary mx-auto"
          href="/auth/google"
        >
          Login With Google <i className="bi bi-google"></i>
        </a>
      );
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>SurveyTime!</h1>
      <p>
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
