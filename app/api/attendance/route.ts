import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { rfid } = await req.json();
    const [result] = await pool.query(
      'INSERT INTO attendance (student_id, timestamp) VALUES ((SELECT id FROM students WHERE rfid = ?), NOW())',
      [rfid]
    );
    return NextResponse.json({ message: 'Attendance recorded successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error recording attendance:', error);
    return NextResponse.json({ error: 'Failed to record attendance' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const classFilter = searchParams.get('class');

    let query = 'SELECT s.name, s.class, a.timestamp FROM attendance a JOIN students s ON a.student_id = s.id WHERE DATE(a.timestamp) = ?';
    const params = [date];

    if (classFilter) {
      query += ' AND s.class = ?';
      params.push(classFilter);
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance data' }, { status: 500 });
  }
}