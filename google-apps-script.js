const NOTIFICATION_EMAIL = "mclaytonpotters@gmail.com";

function doPost(e) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVPs");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.attending || ""
  ]);

  const subject = "New Wedding RSVP: " + (data.name || "Unknown");
  const attending = data.attending === "yes" ? "Joyfully accepts" : "Regretfully declines";
  const body = "New RSVP received!\n\n"
    + "Name: " + (data.name || "") + "\n"
    + "Email: " + (data.email || "") + "\n"
    + "Attending: " + attending + "\n";

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
