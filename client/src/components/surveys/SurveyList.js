import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="card text-center m-3" key={survey._id}>
          <div className="card-header">Survey</div>
          <div className="card-body">
            <h5 className="card-title">{survey.title}</h5>
            <p className="card-text">{survey.body}</p>
            <a className="btn btn-primary me-3">Yes : {survey.yes} </a>
            <a className="btn btn-danger">No : {survey.no} </a>
          </div>
          <div className="card-footer text-muted">
            Sent On : {new Date(survey.dateSent).toLocaleDateString()}
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}
const mapStateToProps = ({ surveys }) => {
  return { surveys };
};
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
