// show add input
import _ from "lodash";
import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formField";

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form
          className="mb-4"
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="btn btn-danger">
            Cancel
            <i className="bi bi-x-circle ms-2"></i>
          </Link>
          <button className="btn btn-success float-end" type="submit">
            Next
            <i className="bi bi-check2-circle ms-2"></i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  form: "surveyForm",
  validate,
  destroyOnUnmount: false,
})(SurveyForm);
