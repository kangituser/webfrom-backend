const { MAIL_ROUTE } = process.env;
const axios = require("axios");
const enums = require('./mail/states');

const user = require('./mail/user');
const serviceRequest = require("./mail/sr");

module.exports = async (data, route, state) => {
  try {

    if (route === enums.AUTH && state === enums.userWaiting) {
      // acknowledge user | send email to managers
      await axios.post(MAIL_ROUTE, { email: user.userWaitingApproval(data) });
      await axios.post(MAIL_ROUTE, { email: user.userAcknowledge(data) });
    }

    if (route === enums.AUTH && state === enums.userAccepted) {
      // send user email that he has been accepted
      await axios.post(MAIL_ROUTE, { email: user.userAccepted(data) });
    }

    if (route === enums.PASSWORD && (state === enums.passwordUpdate || state === enums.passwordReset)) {
      // send email to user about password being updated successfully
      await axios.post(MAIL_ROUTE, { email: user.passwordUpated(data) });
    }

    if (route === enums.PASSWORD && state === enums.generatekey) {
      // handle generate key
      await axios.post(MAIL_ROUTE, { email: user.generateKey(data) });
    }

    if (route === enums.SERVICE_REQUEST && state === enums.serviceRequestCreated) {
      // send email to KLH
      await axios.post(MAIL_ROUTE, { email: serviceRequest.serviceRequestCreated(data) });
    }

    if (route === enums.SERVICE_REQUEST && state === enums.serviceRequestEdited) {
      // send klh & owner of service request email about update
      await axios.post(MAIL_ROUTE, { email: serviceRequest.serviceRequestUpdated(data) });
    }

    if (route === enums.SERVICE_REQUEST && state === enums.serviceRequestClosed) {
      // send owner email that service request has been closed
      await axios.post(MAIL_ROUTE, { email: serviceRequest.serviceRequestClosed(data) });
    }

    if (route === enums.USER && state === enums.userActivated) {
      // send email to activated user
      await axios.post(MAIL_ROUTE, { email: user.userActivated(data) });
    }
  } catch (err) {
    throw err;
  }
};
