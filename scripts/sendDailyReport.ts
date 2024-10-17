import nodemailer from 'nodemailer';
import pool from '../lib/db';

async function sendDailyReport() {
  try {
    // Fetch settings
    const [settingsRows] = await pool.query('SELECT * FROM settings');
    const settings = settingsRows[0];

    // Fetch today's attendance
    const [attendanceRows] = await pool.query(
      'SELECT s.name, s.class, a.timestamp FROM attendance a JOIN students s ON a.student_id = s.id WHERE DATE(a.timestamp) = CURDATE()'
    );

    // Create email content
    const emailContent = `
      <h1>Daily Attendance Report</h1>
      <p>Date: ${new Date().toLocaleDateString()}</p>
      <table>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Time</th>
        </tr>
        ${attendanceRows.map((row: any) => `
          <tr>
            <td>${row.name}</td>
            <td>${row.class}</td>
            <td>${new Date(row.timestamp).toLocaleTimeString()}</td>
          </tr>
        `).join('')}
      </table>
    `;

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: settings.email_report_recipients,
      subject: 'Daily Attendance Report',
      html: emailContent,
    });

    console.log('Daily report sent successfully');
  } catch (error) {
    console.error('Error sending daily report:', error);
  } finally {
    await pool.end();
  }
}

sendDailyReport();