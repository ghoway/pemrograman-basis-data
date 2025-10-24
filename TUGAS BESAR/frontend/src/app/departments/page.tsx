'use client';

import { useEffect, useState } from 'react';

interface Department {
  id: number;
  name: string;
}

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/departments');
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingDepartment
      ? `http://localhost:5000/api/departments/${editingDepartment.id}`
      : 'http://localhost:5000/api/departments';
    const method = editingDepartment ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
        }),
      });
      if (res.ok) {
        fetchDepartments();
        setShowForm(false);
        setEditingDepartment(null);
        setFormData({ name: '' });
      }
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus departemen ini?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/departments/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchDepartments();
        }
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Departemen
        </h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Tambah Departemen
      </button>
      {showForm && (
        <div className="mb-8 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {editingDepartment ? 'Edit Departemen' : 'Tambah Departemen'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Nama Departemen
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                  placeholder="Masukkan nama departemen"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded transition-all duration-300">
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingDepartment(null);
                    setFormData({ name: '' });
                  }}
                  className="flex-1 bg-white/20 border border-white/30 hover:bg-white/30 text-gray-700 hover:text-gray-900 py-3 rounded transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg p-6 hover:bg-white/30 transition-colors overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left text-orange-500 py-2">ID</th>
              <th className="text-left text-orange-500 py-2">Nama Departemen</th>
              <th className="text-left text-orange-500 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.id} className="border-b border-gray-200">
                <td className="py-2 text-orange-500">{department.id}</td>
                <td className="py-2 text-orange-500">{department.name}</td>
                <td className="py-2 text-orange-500">
                  <button
                    onClick={() => handleEdit(department)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(department.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departments;