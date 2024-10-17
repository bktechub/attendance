'use client';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function BulkAttendance() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      // Here you would typically send the file to your backend
      setMessage(`File "${file.name}" uploaded successfully. Processing...`);
      // Reset the file input
      setFile(null);
    } else {
      setMessage('Please select a file to upload.');
    }
  };

  const handleDownloadTemplate = () => {
    // Here you would typically generate and download the template
    // For this example, we'll just show a message
    setMessage('Template downloaded. Check your downloads folder.');
  };

  return (
    <div className="container mt-5">
      <h2>Bulk Attendance Upload</h2>
      <Button variant="secondary" onClick={handleDownloadTemplate} className="mb-3">
        Download Template
      </Button>
      <Form onSubmit={handleUpload}>
        <Form.Group className="mb-3">
          <Form.Label>Upload Excel File</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload and Process
        </Button>
      </Form>
      {message && <Alert variant="info" className="mt-3">{message}</Alert>}
    </div>
  );
}