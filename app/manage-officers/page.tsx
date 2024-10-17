'use client';
import { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

export default function ManageOfficers() {
  const [officers, setOfficers] = useState([
    { id: 1, name: 'Officer 1', email: 'officer1@example.com' },
    { id: 2, name: 'Officer 2', email: 'officer2@example.com' },
  ]);

  const [newOfficer, setNewOfficer] = useState({ name: '', email: '' });

  const handleAddOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    setOfficers([...officers, { id: officers.length + 1, ...newOfficer }]);
    setNewOfficer({ name: '', email: '' });
  };

  return (
    <div className="container mt-5">
      <h2>Manage Officers</h2>
      <Form onSubmit={handleAddOfficer} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={newOfficer.name}
            onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={newOfficer.email}
            onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Officer
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {officers.map((officer) => (
            <tr key={officer.id}>
              <td>{officer.id}</td>
              <td>{officer.name}</td>
              <td>{officer.email}</td>
              <td>
                <Button variant="danger" size="sm">Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}