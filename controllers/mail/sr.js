const prepareMailBody = require("./body");

module.exports = {
  serviceRequestCreated: data => {
    let title = `נפתחה קריאת שירות חדשה במערכת שמספרה ${data.srId}`;
    let mail = data.email;
    let output = `
    <div style="direction: rtl;">
    <p>שלום רב,</p>
    <p>קטגוריה: ${data.main} ${data.sub}</p>
    <p>מודול: ${data.klhModule}</p>
    <p>כותרת: ${data.title}</p>
    <p>תיאור: ${data.description}</p>
    <p>משתמש בקשה: ${data.name}</p>
    <p>דחיפות: ${data.impact}</p>
    <p>בברכה,</p>
    <p>צוות מערכות מידע</p></div>
    `;
    return prepareMailBody(mail, title, output);
  },

  serviceRequestUpdated: data => {
    let title = `קריאה שמספרה ${data.srId} עודכנה`;
    let mail = data.email;
    let output = `
  <div style="direction: rtl;">
  <p>שלום,</p>
  
  <p>קטגוריה: ${data.category} ${data.subCategory}</p>
  <p>מודול: ${data.module}</p>
  <p>כותרת: ${data.title}</p>
  <p>תיאור: ${data.description}</p>
  <p>משתמש בקשה: ${data.name}</p>
  <p>דחיפות: ${data.impact}</p>
  <p>בברכה,</p>
  <p>צוות מערכות מידע</p></div>
  `;
    return prepareMailBody(mail, title, output);
  },

  serviceRequestProcessed: data => {
    let title = `קריאה שמספרה ${data.srId} בטיפול`;
    let mail = data.email;
    let output = `
    <div style="direction: rtl;">
    <p>שלום,</p>
    
    <p>קריאה שמספרה ${data.srId} נמצאת בטיפול</p>
    <p>פרטי הקריאה:</p>
  
    <p>קטגוריה: ${data.category} ${data.subCategory}</p>
    <p>מודול: ${data.module}</p>
    <p>כותרת: ${data.title}</p>
    <p>תיאור: ${data.description}</p>
    <p>משתמש בקשה: ${data.name}</p>
    <p>דחיפות: ${data.impact}</p>
    <p>בברכה,</p>
    <p>צוות מערכות מידע</p></div>
    `;

    return prepareMailBody(mail, title, output);
  },

  serviceRequestClosed: data => {
    let title = `קריאה שמספרה ${data.srId} נסגרה`;
    let mail = data.email;
    let output = `
    <div style="direction: rtl;">
    <p>שלום,</p>
    
    <p>קריאה שמספרה ${data.srId} נסגרה בסטאטוס '${data.status}'</p>
    <p>פרטי הקריאה:</p>
  
    <p>כותרת: ${data.title}</p>
    <p>קטגוריה: ${data.category} ${data.subCategory}</p>
    <p>מודול: ${data.module}</p>
    <p>תיאור: ${data.description}</p>
    
    <p>בברכה,</p>
    <p>צוות מערכות מידע</p></div>`;

    return prepareMailBody(mail, title, output);
  },

  serviceRequestStatusChanged: data => {
    let title = `קריאה שמספרה ${data.srId} שונתה לסטאטוס ${data.status}`;
    let mail = data.email;
    let output = `
  <div style="direction: rtl;">
  <p>שלום,</p>
  <p>סטאטוס הקריאה השתנה ל${data.status}</p>
  <p>קטגוריה: ${data.category} ${data.subCategory}</p>
  <p>מודול: ${data.module}</p>
  <p>כותרת: ${data.title}</p>
  <p>תיאור: ${data.description}</p>
  <p>משתמש בקשה: ${data.name}</p>
  <p>דחיפות: ${data.impact}</p>
  <p>בברכה,</p>
  <p>צוות מערכות מידע</p></div>
  `;
    return prepareMailBody(mail, title, output);
  },
};
