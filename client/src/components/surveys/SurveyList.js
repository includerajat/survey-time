import React from "react";
import { connect } from "react-redux";
import { fetchSurveys, archiveSurvey } from "../../actions";

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      if (survey === "No Survey") {
        return (
          <div
            key="no survey"
            style={{ textAlign: "center" }}
            className="lead my-3"
          >
            You haven't any survey . Make a new survey hit the
            <em> Add a new Survey </em>
            button and start your journey in <strong>Survey Time</strong>.
          </div>
        );
      }
      return (
        <div className="col-md-12 col-xl-6" key={survey._id}>
          <div className="card text-center m-3">
            <div className="card-header">
              Survey
              <span>
                <button
                  onClick={() => this.props.archiveSurvey(survey._id)}
                  type="button"
                  className="btn btn-outline-secondary ms-3"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Archieve the survey"
                >
                  <i className="bi bi-archive"></i>
                </button>
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">{survey.title}</h5>
              <p className="card-text">{survey.body}</p>
              <a className="btn btn-primary me-3">Yes : {survey.yes} </a>
              <a className="btn btn-danger">No : {survey.no} </a>
            </div>
            <div className="card-footer text-muted">
              <span>
                Sent On : {new Date(survey.dateSent).toLocaleDateString()} ,
              </span>
              {survey.lastResponded ? (
                <span>
                  &nbsp;Last Response :{" "}
                  {new Date(survey.lastResponded).toLocaleDateString()}
                </span>
              ) : (
                "Last Response : No response come"
              )}
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    const body =
      this.props.surveys.length === 0 ? (
        <div className="d-flex justify-content-center mt-5 text-primary mb-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row justify-content-md-center">
            {this.renderSurveys()}
          </div>
        </div>
      );
    return body;
  }
}
const mapStateToProps = ({ surveys }) => {
  return { surveys };
};
export default connect(mapStateToProps, { fetchSurveys, archiveSurvey })(
  SurveyList
);
