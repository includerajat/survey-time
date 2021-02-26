import { ARCHIVE_SURVEYS } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case ARCHIVE_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
