function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var payload = JSON.parse(e.postData.contents || '{}');

  sheet.appendRow([
    new Date(),
    payload.name || '',
    payload.phone || '',
    payload.email || '',
    payload.interestedIn || '',
    payload.location || '',
    payload.budget || '',
    payload.message || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}