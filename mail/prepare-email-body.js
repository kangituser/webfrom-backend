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
      to = mail.shift();    
    }
    let bcc = mail;
    body = {
      from: '"Engineering" <engineering@kan.org.il>',
      to: to,
      subject: title,
      html: output,
      bcc: bcc
    }
  }
  
  return body;
}

module.exports = { prepareMailBody };