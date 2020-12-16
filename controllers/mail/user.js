const prepareMailBody = require("./body");
let ref = '<a href="http://eng.kan.org.il">למערכת</a>';

module.exports = {
  userWaitingApproval: data => {
    let title = `משתמש חדש מחכה לאישורך`;
    let admins = data.admins;
    let output = `
    <div style="direction: rtl;">
    <p>שלום רב,</p>
    <p>מחכה לאישורך משתמש חדש בשם ${data.name}</p>
    <p>ניתן להיכנס למערכת ע"י הקישור הבא: ${ref}</p>
    
    <p>בברכה,</p>
    <p>צוות מערכות מידע</p></div>
    `;
    return prepareMailBody(admins, title, output);
  },

  userAcknowledge: data => {
    let title = `שלום ${data.name}`;
    let mail = data.email;
    let output = `
    <div style="direction: rtl;">
    <p>בקשתך לרישום למערכת קריאות שירות עבור מערכת טראפיק התקבלה במערכת.</p>
    <p>הבקשה ממתינה לאישור של מנהל המערכת.</p>
    <p>לאחר אישור המשתמש ישלח מייל אישור</p>
    
    <p>בברכה,</p>
    <p>צוות מערכות מידע</p></div>
    `;
    return prepareMailBody(mail, title, output);
  },

  userAccepted: data => {
    let title = `אישור הרשמה למערכת לניהול קריאות שירות`;
    let mail = data.email;
    let output = `
    <div style="direction: rtl;">
    <p>שלום ${data.name},</p>
    <p>בקשתך לרישום אושרה ע"י מנהל המערכת.</p>
    <p>שם משתמש: ${data.name}</p>
    <p>ניתן להיכנס למערכת ע"י הקישור הבא: ${ref}</p>
    
    <p>בברכה,</p>
    <p>צוות מערכות מידע</p></div>
    `;
    return prepareMailBody(mail, title, output);
  },

  passwordUpated: data => {
    let title = `איפוס סיסמה למערכת לניהול קריאות שירות`;
    let mail = data.email;
    let output = `
    <div style="direction: rtl;">
    <p>שלום ${data.name},</p>
    <p>הסיסמא שונתה בהצלחה.</p>
    <p>אם לא ביקשת לשנות סיסמה נא לא להיכנס לקישור ולעדכן את מנהל המערכת.</p>
    
    <p>בברכה,</p>
    <p>צוות מערכות מידע</p></div>
    `;
    return prepareMailBody(mail, title, output);
  },

  generateKey: data => {
    let title = `איפוס סיסמה למערכת לניהול קריאות שירות`;
    let mail = data.email;
    let output = `
      <div style="direction: rtl;">
      <p>שלום ${data.name},</p>
      <p>בקשתך לאיפוס סיסמה התקבלה במערכת.</p>
      <p>אפס סיסמתך באתר באמצעות הקוד הבא: ${data.newToken}</p>
      <p>אם לא ביקשת לשנות סיסמה נא לא להיכנס לקישור ולעדכן את מנהל המערכת.</p>
      
      <p>בברכה,</p>
      <p>צוות מערכות מידע</p></div>
      `;
    return prepareMailBody(mail, title, output);
  },

  userActivated: data => {
    let title = `אישור הרשמה למערכת לניהול קריאות שירות`;
    let mail = data.email;
    let output = `
  <div style="direction: rtl;">
  <p>שלום ${data.fullName},</p>
  <p>בקשתך לרישום אושרה ע"י מנהל המערכת.</p>
  <p>שם משתמש: ${data.fullName}</p>
  <p>ניתן להיכנס למערכת ע"י הקישור הבא: ${ref}</p>
  
  <p>בברכה,</p>
  <p>צוות מערכות מידע</p></div>
  `;
    return prepareMailBody(mail, title, output);
  },
};