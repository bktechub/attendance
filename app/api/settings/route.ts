import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM settings');
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { systemName, footer, emailReportRecipients } = await req.json();
    await pool.query(
      'UPDATE settings SET system_name = ?, footer = ?, email_report_recipients = ?',
      [systemName, footer, emailReportRecipients]
    );
    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}