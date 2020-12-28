module.exports = (mail, title, output) => {
  return {
    from: '"Engineering" <engineering@kan.org.il>',
    to: mail[0],
    subject: title,
    html: output,
    bcc: mail.length > 1 ? mail.slice(1) : null
  }
}