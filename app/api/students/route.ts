import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import * as XLSX from 'xlsx';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    for (const student of data) {
      await pool.query(
        'INSERT INTO students (name, rfid, class, gender) VALUES (?, ?, ?, ?)',
        [student.name, student.rfid, student.class, student.gender]
      );
    }

    return NextResponse.json({ message: 'Students added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding students:', error);
    return NextResponse.json({ error: 'Failed to add students' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    const gender = searchParams.get('gender');
    const classFilter = searchParams.get('class');

    let query = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    if (name) {
      query += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }
    if (gender) {
      query += ' AND gender = ?';
      params.push(gender);
    }
    if (classFilter) {
      query += ' AND class = ?';
      params.push(classFilter);
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}