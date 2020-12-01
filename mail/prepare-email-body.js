const prepareMailBody = (mail, title, output) => {
  let body;
  if (typeof mail == 'string') {
    body = {
      from: '"Engineering" <engineering@kan.morg.il>',
      to: mail,
      subject: title,
      html: output,
    }
  } else {
    let to = ''
    if (typeof mail == 'object') {
      // to = mail.shift();
    }
    // let bcc = mail;
    body = {
      from: '"Engineering" <engineering@kan.morg.il>',
      to: mail[0],
      subject: title,
      html: output,
      bcc: mail.slice(1)
    }
  }
  
  return body;
}

module.exports = { prepareMailBody };