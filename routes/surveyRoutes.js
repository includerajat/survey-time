const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id,
    }).select({
      recipients: false,
    });
    if (surveys.length === 0) {
      return res.send(["No Survey"]);
    }
    const unArchiveSurveys = surveys.filter(
      (survey) => survey.isArchive === false
    );
    res.send(unArchiveSurveys);
  });
  app.get("/api/archiveSurveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id,
    }).select({
      recipients: false,
    });
    if (surveys.length === 0) {
      return res.send(["No Survey"]);
    }
    const unArchiveSurveys = surveys.filter(
      (survey) => survey.isArchive === true
    );
    res.send(unArchiveSurveys);
  });

  app.get("/api/:id/archive", requireLogin, async (req, res) => {
    console.log("Hello");
    const survey = await Survey.findByIdAndUpdate(
      req.params.id,
      { isArchive: true },
      { new: true }
    );
    const surveys = await Survey.find({
      _user: req.user.id,
    }).select({
      recipients: false,
    });
    const unArchiveSurveys = surveys.filter(
      (survey) => survey.isArchive === false
    );
    res.send(unArchiveSurveys);
  });

  app.get("/api/surveys/:surveyId/thanks/:choice", (req, res) => {
    res.send("Thanks for voting!!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/thanks/:choice");
    _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { ...match, email };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
