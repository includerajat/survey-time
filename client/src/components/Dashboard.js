import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "../components/surveys/SurveyList";

const Dashboard = () => {
  return (
    <div>
      <div className="d-grid col-6 mx-auto">
        <Link
          to="/surveys/new"
          className="btn btn-outline-primary btn-lg float-end"
        >
          <span className="me-4"> Add a new Survey</span>
          <i className="bi bi-plus-circle-fill"></i>
        </Link>
      </div>
      <SurveyList />
      <div>
        <Link
          to="/surveys/new"
          className="btn btn-outline-primary btn-lg float-end mb-3"
        >
          <i className="bi bi-plus-circle-fill"></i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
