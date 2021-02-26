import React from "react";
import { connect } from "react-redux";
import { archiveSurveys } from "../../actions";

class SurveyArchive extends React.Component {
  componentDidMount() {
    this.props.archiveSurveys();
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
            You haven't any archive survey .
          </div>
        );
      }
      return (
        <div className="col-md-12 col-xl-6" key={survey._id}>
          <div className="card text-center m-3">
            <div className="card-header">Survey</div>
            <div className="card-body">
              <h5 className="card-title">{survey.title}</h5>
              <p className="card-text">{survey.body}</p>
              <a className="btn btn-primary me-3">Yes : {survey.yes} </a>
              <a className="btn btn-danger">No : {survey.no} </a>
            </div>
            <div className="card-footer text-muted">
              <span>
                Sent On : {new Date(survey.dateSent).toLocaleDateString()}{" "}
              </span>
              {survey.lastResponded ? (
                <span>
                  Last Response :{" "}
                  {new Date(survey.lastResponded).toLocaleDateString()}
                </span>
              ) : (
                ""
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
const mapStateToProps = ({ archiveSurveys: surveys }) => {
  return { surveys };
};
export default connect(mapStateToProps, { archiveSurveys })(SurveyArchive);
