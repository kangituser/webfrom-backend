const { prepareMailBody } = require('./prepare-email-body');

const userMsgRouter = (data, route, state, pwd) => {  
  if (route.includes('register') && !state) {
    return userWaiting(data) ; 
  } else if (route.includes('register') && state.includes('waiting')) {
    return userAccepted(data) && registerRequest(data);
  } else if (route.includes('key') && !state) {
    return userPwdUpdateRequest(data, pwd);
  }  else if (route.includes('update') || route.includes('reset')) {
    return pwdChanged(data);
  } else if (route.includes('update') && state.includes('activated')) {
    return userActivated(data);
  }
}

const userActivated = data => {
  let title = `אישור הרשמה למערכת לניהול קריאות שירות`;
  let mail = data.email;  
  let ref = '<a href="http://eng.kan.org.il">למערכת</a>';
  let output = `
  <div style="direction: rtl;">
  <p>שלום ${data.name},</p>
  <p>בקשתך לרישום אושרה ע"י מנהל המערכת.</p>
  <p>שם משתמש: ${data.name}</p>
  <p>ניתן להיכנס למערכת ע"י הקישור הבא: ${ref}</p>
  
  <p>בברכה,</p>
  <p>צוות מערכות מידע</p></div>
  `  
  return prepareMailBody(mail, title, output);
}

const pwdChanged = data => {
  let title = `איפוס סיסמה למערכת לניהול קריאות שירות`;
  let mail = data.email;  
   let output = `
  <div style="direction: rtl;">
  <p>שלום ${data.name},</p>
  <p>הסיסמא שונתה בהצלחה.</p>
  <p>אם לא ביקשת לשנות סיסמה נא לא להיכנס לקישור ולעדכן את מנהל המערכת.</p>
  
  <p>בברכה,</p>
  <p>צוות מערכות מידע</p></div>
  `  
  return prepareMailBody(mail, title, output);
}

const userPwdUpdateRequest = (data, pwd) => {
  let title = `איפוס סיסמה למערכת לניהול קריאות שירות`;
  let mail = data.email;  
   let output = `
  <div style="direction: rtl;">
  <p>שלום ${data.name},</p>
  <p>בקשתך לאיפוס סיסמה התקבלה במערכת.</p>
  <p>אפס סיסמתך באתר באמצעות הקוד הבא: ${pwd}</p>
  <p>אם לא ביקשת לשנות סיסמה נא לא להיכנס לקישור ולעדכן את מנהל המערכת.</p>
  
  <p>בברכה,</p>
  <p>צוות מערכות מידע</p></div>
  `  
  return prepareMailBody(mail, title, output);
}

const userAccepted = data => {
  let title = `אישור הרשמה למערכת לניהול קריאות שירות`;
  let mail = data.email;  
  let ref = '<a href="http://eng.kan.org.il">למערכת</a>';
  let output = `
  <div style="direction: rtl;">
  <p>שלום ${data.name},</p>
  <p>בקשתך לרישום אושרה ע"י מנהל המערכת.</p>
  <p>שם משתמש: ${data.name}</p>
  <p>ניתן להיכנס למערכת ע"י הקישור הבא: ${ref}</p>
  
  <p>בברכה,</p>
  <p>צוות מערכות מידע</p></div>
  `  
  return prepareMailBody(mail, title, output);
}

const userWaiting = data => {
  let title = `שלום ${data.name}`;
  let mail = data.email;  
  let output = `
  <div style="direction: rtl;">
  <p>בקשתך לרישום למערכת קריאות שירות עבור מערכת טראפיק התקבלה במערכת.</p>
  <p>הבקשה ממתינה לאישור של מנהל המערכת.</p>
  <p>לאחר אישור המשתמש ישלח מייל אישור</p>
  
  <p>בברכה,</p>
  <p>צוות מערכות מידע</p></div>
  `  
  return prepareMailBody(mail, title, output);
}

const registerRequest = data => {
  let ref = '<a href="http://eng.kan.org.il">למערכת</a>';
  let title = `משתמש חדש מחכה לאישורך`;
  let admins = data.email;  
  let output = `
  <div style="direction: rtl;">
  <p>שלום רב,</p>
  <p>מחכה לאישורך משתמש חדש בשם ${data.name}</p>
  <p>ניתן להיכנס למערכת ע"י הקישור הבא: ${ref}</p>
  
  <p>בברכה,</p>
  <p>צוות מערכות מידע</p></div>
  `  
  return prepareMailBody(admins, title, output);
}

module.exports = { userMsgRouter };