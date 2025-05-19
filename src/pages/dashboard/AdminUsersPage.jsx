import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const AdminUsersPage = () => {
  const { user, createSubAdmin } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createSubAdmin(form.name, form.email, form.password)) {
      setSuccess('Sub-admin created!');
      setForm({ name: '', email: '', password: '' });
    }
  };

  if (!user || user.role !== 'superadmin') return <div>Access Denied</div>;

  return (
    <div>
      <h2>Create Sub-Admin</h2>
      <form onSubmit={handleSubmit}>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
        <input value={form.email} type="email" onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
        <input value={form.password} type="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" required />
        <button type="submit">Create</button>
      </form>
      {success && <div>{success}</div>}
    </div>
  );
};

export default AdminUsersPage;
