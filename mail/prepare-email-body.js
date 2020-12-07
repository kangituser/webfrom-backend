const prepareMailBody = (mail, title, output) => {
  let body;
  if (typeof mail == 'string') {
    body = {
      from: '"Engineering" <engineering@kan.org.il>',
      to: mail,
      subject: title,
      html: output,
    }
  } else {
    let to = ''
    if (typeof mail == 'object') {
      // to = mail.shift();
    }
    mail.push('jonathana@kan.org.il');
    body = {
      from: '"Engineering" <engineering@kan.org.il>',
      to: mail[0],
      subject: title,
      html: output,
      bcc: mail.slice(1)
    }
  }
  
  return body;
}

module.exports = { prepareMailBody };