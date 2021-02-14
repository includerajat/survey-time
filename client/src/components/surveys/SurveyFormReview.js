import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formField";
import { withRouter } from "react-router-dom";
import { submitSurvey } from "../../actions";

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your survey</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat white-text right"
      >
        Send Survey<i className="material-icons right">email</i>
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};
export default connect(mapStateToProps, {
  submitSurvey,
})(withRouter(SurveyReview));
