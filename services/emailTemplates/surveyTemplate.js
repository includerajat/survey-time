const keys = require("../../config/key");
module.exports = ({ body, id }) => {
  return `
  <html>
    <body>
      <div style='text-align: center;'>
        <h3>I'd like your input! </h3>  
        <p>Please answer the following questions: </p>
        <p> ${body} </p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${id}/thanks/yes">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${id}/thanks/no">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
};
