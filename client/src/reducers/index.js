import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";
import archiveReducer from "./archiveReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
  archiveSurveys: archiveReducer,
});
