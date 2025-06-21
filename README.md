# Google Workspace Gmail Automation App

A custom application built entirely within Google Workspace to automate sending personalized, recurring emails. This project demonstrates skills in Google Apps Script, API integration, and building secure, serverless web applications. This project was built as a proof-of-concept based on an Upwork job posting.

## Features

* **Simple Web App Interface:** An easy-to-use web form for adding and managing client data.
* **Client Management:** Store client details and set their status to 'Active' or 'Inactive'.
* **Automated Email Scheduling:** Automatically sends personalized emails to all 'Active' clients based on a recurring day schedule (e.g., every 7, 30, or 90 days).
* **Secure Data Storage:** Uses Google Sheets as a secure, no-cost database backend.
* **Serverless Architecture:** Built entirely on Google Apps Script, requiring no external servers or recurring hosting costs.
* **HIPAA-Compliant Design Principles:** Developed with security and compliance in mind, including audit logging and reliance on Google's secure infrastructure.

## Tech Stack

* **Backend:** Google Apps Script (JavaScript-based)
* **Frontend:** HTML Service (HTML, CSS, JavaScript)
* **Database:** Google Sheets
* **APIs:** Gmail API, Spreadsheet API
* **Development Tooling:** `clasp` (Command Line Apps Script Projects) for local development with VS Code.

## Screenshots

`![Web App Interface]https://github.com/user-attachments/assets/6b0e0fe4-6ffd-42d1-92f0-9df157f73026)`

## Setup and Installation

Follow these steps to set up and deploy your own instance of this application.

#### Prerequisites
* A Google Account
* Node.js and `npm` installed locally
* `clasp` installed globally (`npm install -g @google/clasp`)

#### 1. Set up the Google Sheet

1.  Create a new Google Sheet.
2.  Name the sheet tab **"Client Data"**.
3.  In the first row, add the following headers exactly:
    `ClientID`, `FirstName`, `LastName`, `Email`, `PhoneNumber`, `DaysToEmail`, `Message`, `Status`, `NextSendDate`, `LastUpdated`
4.  Create a second sheet tab and name it **"Audit Log"**.

#### 2. Clone and Configure the Project

1.  Clone this repository to your local machine:
    ```bash
    git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
    ```
2.  Navigate into the project folder:
    ```bash
    cd your-repository-name
    ```
3.  Log in to `clasp`:
    ```bash
    clasp login
    ```
4.  Create a new Apps Script project:
    ```bash
    clasp create --type standalone --title "Gmail Automation App"
    ```
5.  Open `Code.gs`. Find the `SPREADSHEET_ID` constant and replace the placeholder value with the actual ID from your Google Sheet's URL.
    ```javascript
    const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
    ```
6.  Push the files to your new Apps Script project:
    ```bash
    clasp push
    ```

#### 3. Deploy the Web App

1.  Open the project in the Apps Script editor: `clasp open`.
2.  Click **Deploy > New deployment**.
3.  Click the gear icon and select **Web app**.
4.  Configure it with access for **"Only myself"** (or your organization) and to **"Execute as Me"**.
5.  Click **Deploy**. Copy the generated web app URL to use the application.

#### 4. Set Up the Automation Trigger

1.  In the Apps Script editor, go to the **Triggers** tab (clock icon).
2.  Click **+ Add Trigger**.
3.  Choose the function to run: **`sendScheduledEmails`**.
4.  Select event source: **`Time-driven`**.
5.  Select type of time-based trigger: **`Day timer`**.
6.  Set the time of day for it to run (e.g., 8am to 9am).
7.  Click **Save**. You will need to grant permissions for the script to run automatically.

## Usage

1.  Navigate to the deployed web app URL to add or manage clients.
2.  The trigger will automatically run once a day to check for and send any due emails to "Active" clients.
