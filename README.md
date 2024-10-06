# Trashmailer

Trashmailer provides a simple tool to send mass emails in configurable batches using Gmail SMTP. The recipient email list and email content are loaded from text files, while the batch size and delays between emails and batches can be configured using a `.env` file. The script is built in TypeScript and uses the `nodemailer` package for email delivery.

## Features
- **Batch Email Sending**: Emails are sent in batches, with a configurable batch size.
- **Configurable Delays**: Add delays between sending individual emails and between batches.
- **Email Content and Recipients from Files**: Read recipient emails and email content from separate text files.
- **Gmail SMTP**: Uses Gmail's SMTP server to send emails.
- **Environment Configuration**: Configure all variables, such as SMTP credentials, batch size, and delays, via a `.env` file.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RyanWalker277/trashmailer
   ```
2. Navigate to the project directory:
   ```bash
   cd trashmailer
   ```
3. Install dependencies:
   ```bash
    npm install
   ```
4. Create a `.env` file by copying the provided `.env.sample`:
   ```bash
   cp .env.sample .env
   ```

Update the `.env` file with your Gmail SMTP credentials and configuration.

Create the email list file (e.g., `emails.txt`) with each recipient’s email on a new line.

Create the email content file (e.g., `email-content.txt`) with the message you want to send.

## Configuration

In your .env file, set the following variables:

```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_SUBJECT=Your email subject here
EMAIL_BATCH_SIZE=10
EMAIL_DELAY_BETWEEN_BATCHES=5000 # Delay between batches in milliseconds
EMAIL_DELAY_BETWEEN_EMAILS=1000  # Delay between individual emails in milliseconds
EMAIL_RECIPIENT_FILE=emails.txt
EMAIL_CONTENT_FILE=email-content.txt
```

## Usage

To run the script, use the following command:

```
ts-node massEmailSender.ts
```

The script will start sending emails in batches, introducing the configured delays between emails and batches.

## Example Files

- emails.txt

```
recipient1@example.com
recipient2@example.com
recipient3@example.com
```

## Notes

Ensure that you enable "Less secure apps" or use an App Password if 2-factor authentication is enabled on your Gmail account.