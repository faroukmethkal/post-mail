
 const sgMail = require("@sendgrid/mail");
//const config = require('config');
const keys = require("../config/keys");

sgMail.setApiKey(keys.sendGridAPIKey);

const sendEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "post@dengodeby.dk",
    subject: "Så er der post!",
    text: `Kære ${name}
        Du har netop modtaget et brev, der ligger i vores mappe i BLIXENS reception.
        Hent venligst dit brev idag.
        
        De bedste hilsner 
        Den Gode Bys automatiske postcentral`
  });
};

module.exports = {
  sendEmail
};
