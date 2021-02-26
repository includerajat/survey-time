import React, { useState } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formField";
import { withRouter } from "react-router-dom";
import { submitSurvey } from "../../actions";

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const [disable, setDisbale] = useState(false);
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div className="mb-3" key={name}>
        <label className="form-label">{label}</label>
        <input className="form-control" disabled value={formValues[name]} />
      </div>
    );
  });
  const classes = disable
    ? `btn btn-success float-end disabled`
    : "btn btn-success float-end";

  return (
    <div className="mb-3">
      <h5 className="text-center">Please confirm your survey</h5>
      <form>{reviewFields}</form>
      <button className="btn btn-warning" onClick={onCancel}>
        <i className="bi bi-arrow-left me-2"></i>Back
      </button>
      <button
        onClick={() => {
          submitSurvey(formValues, history);
          setDisbale(true);
        }}
        className={classes}
      >
        Send Survey<i className="bi bi-envelope-fill ms-2"></i>
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
