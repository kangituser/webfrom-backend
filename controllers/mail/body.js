module.exports = (mail, title, output) => {
  return {
    from: '"Engineering" <engineering@kan.morg.il>',
    to: mail[0],
    subject: title,
    html: output,
    bcc: mail.length > 1 ? mail.slice(1) : null
  }
}