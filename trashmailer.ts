import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const emailService = process.env.EMAIL_SERVICE || 'gmail';
const emailUser = process.env.EMAIL_USER || '';
const emailPassword = process.env.EMAIL_PASSWORD || '';
const emailSubject = process.env.EMAIL_SUBJECT || 'Default Subject';
const batchSize = parseInt(process.env.EMAIL_BATCH_SIZE || '10');
const delayBetweenBatches = parseInt(process.env.EMAIL_DELAY_BETWEEN_BATCHES || '5000');
const delayBetweenEmails = parseInt(process.env.EMAIL_DELAY_BETWEEN_EMAILS || '1000');
const recipientFile = process.env.EMAIL_RECIPIENT_FILE || 'emails.txt';
const contentFile = process.env.EMAIL_CONTENT_FILE || 'email-content.txt';

const transporter = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

const sendEmail = async (recipient: string, content: string) => {
  const mailOptions = {
    from: emailUser,
    to: recipient,
    subject: emailSubject,
    text: content,
  };

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Failed to send email to ${recipient}:`, error);
        reject(error);
      } else {
        console.log(`Email sent to ${recipient}: ${info.response}`);
        resolve();
      }
    });
  });
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sendEmailsInBatches = async () => {
  try {

    const emailList = fs.readFileSync(path.resolve(__dirname, recipientFile), 'utf-8').split('\n').map(line => line.trim()).filter(line => line);

    const emailContent = fs.readFileSync(path.resolve(__dirname, contentFile), 'utf-8');

    const totalEmails = emailList.length;
    let batchNumber = 1;

    for (let i = 0; i < totalEmails; i += batchSize) {
      const batch = emailList.slice(i, i + batchSize);
      console.log(`Sending batch ${batchNumber}: ${batch.length} emails`);

      for (const recipient of batch) {
        await sendEmail(recipient, emailContent);
        await delay(delayBetweenEmails); 
      }

      console.log(`Batch ${batchNumber} sent! Waiting for the next batch...`);
      await delay(delayBetweenBatches); 

      batchNumber++;
    }

    console.log('All emails sent!');
  } catch (error) {
    console.error('Error while sending emails:', error);
  }
};

sendEmailsInBatches();