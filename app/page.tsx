import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mt-5">
      <h1 className="text-center mb-4">RFID Attendance Management System</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="d-grid gap-2">
            <Link href="/login" className="btn btn-primary btn-lg">Login</Link>
          </div>
        </div>
      </div>
    </main>
  );
}