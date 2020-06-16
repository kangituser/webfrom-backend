const dispenser = require('./massage-dispenser');
const axios = require('axios');
  
const messageRoutelet = (data, route, pwd, state) => {  
  let email;
  
  if (route.includes('service-request')) {
    email = dispenser.serviceRequestMsgRouter(data, route, pwd);
  } else if (route.includes('user')) {
    email = dispenser.userMsgRouter(data, route, state, pwd);
  }
  //  console.log(email);
   
  mailSender(email);
};

const mailSender = async (mail) => {  
     
  try {
    // await axios.post('dev.kan.org.il/mail/send', {
    await axios.post(process.env.MAIL_ROUTE, {
      mail: mail,
    });
  } catch (err) {
    console.log({ message : err.message });
  }
};

module.exports = { messageRoutelet }