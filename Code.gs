// In Code.gs
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('WebApp.html')
    .setTitle("Client Email Automation");
}
// In Code.gs
const SPREADSHEET_ID = "1tqGQWlMTpKqKKFXzeF4Paf7li2RqaS4MXV1w5upNV_k"; // Get this from the Sheet's URL
const SHEET_NAME = "Client Data";

// In Code.gs
function saveClient(formData) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const nextSendDate = new Date(); // Start sending immediately or on a specific date

    const newRow = [
      Utilities.getUuid(), // Generate a unique ClientID
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.daysToEmail,
      formData.message,
      formData.status,
      nextSendDate,
      new Date() // LastUpdated timestamp
    ];

    sheet.appendRow(newRow);
    return { success: true, message: "Client saved successfully!" };
  } catch (error) {
    console.error("Error in saveClient: ", error);
    return { success: false, message: "Failed to save client." };
  }
}

// In Code.gs
function sendScheduledEmails() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // Remove header row
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of the day for accurate comparison

  data.forEach((row, index) => {
    const client = {};
    headers.forEach((header, i) => client[header] = row[i]); // Convert row array to object

// Normalize today's date to the very beginning of the day (midnight)
// This ensures a fair and accurate comparison against the NextSendDate.
today.setHours(0, 0, 0, 0);
    const nextSend = new Date(client.NextSendDate);
    nextSend.setHours(0, 0, 0, 0);

    if (client.Status === "Active" && nextSend <= today) {
      try {
        const subject = `A message for ${client.FirstName}`;
        // Personalize the message body if needed, e.g., by replacing placeholders
        const personalizedMessage = client.Message.replace('{firstName}', client.FirstName);

        GmailApp.sendEmail(client.Email, subject, personalizedMessage);

        // Calculate and update the next send date
        const newNextSendDate = new Date();
        newNextSendDate.setDate(newNextSendDate.getDate() + parseInt(client.DaysToEmail));

        // Update the sheet. `index + 2` because sheet rows are 1-based and we removed the header.
        sheet.getRange(index + 2, headers.indexOf('NextSendDate') + 1).setValue(newNextSendDate);
        sheet.getRange(index + 2, headers.indexOf('LastUpdated') + 1).setValue(new Date());

        // Log successful send
        console.log(`Email sent to ${client.Email}`);

      } catch (error) {
        console.error(`Failed to send email to ${client.Email}: `, error);
      }
    }
  });
}
