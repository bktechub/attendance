import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM devices');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json({ error: 'Failed to fetch devices' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, type, ipAddress, port } = await req.json();
    await pool.query(
      'INSERT INTO devices (name, type, ip_address, port) VALUES (?, ?, ?, ?)',
      [name, type, ipAddress, port]
    );
    return NextResponse.json({ message: 'Device added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding device:', error);
    return NextResponse.json({ error: 'Failed to add device' }, { status: 500 });
  }
}