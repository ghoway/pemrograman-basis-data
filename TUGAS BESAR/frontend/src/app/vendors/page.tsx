'use client';

import { useEffect, useState } from 'react';

interface Vendor {
  id: number;
  name: string;
  contact_info: string;
  address: string;
}

const Vendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({ name: '', contact_info: '', address: '' });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/vendors');
      const data = await res.json();
      setVendors(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingVendor
      ? `http://localhost:5000/api/vendors/${editingVendor.id}`
      : 'http://localhost:5000/api/vendors';
    const method = editingVendor ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contact_info: formData.contact_info,
          address: formData.address,
        }),
      });
      if (res.ok) {
        fetchVendors();
        setShowForm(false);
        setEditingVendor(null);
        setFormData({ name: '', contact_info: '', address: '' });
      }
    } catch (error) {
      console.error('Error saving vendor:', error);
    }
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name,
      contact_info: vendor.contact_info,
      address: vendor.address,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus vendor ini?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/vendors/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchVendors();
        }
      } catch (error) {
        console.error('Error deleting vendor:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        Vendor
        </h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Tambah Vendor
      </button>
      {showForm && (
        <div className="mb-8 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11l-5.5-5.5L4 11h3v8h6v-8h3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {editingVendor ? 'Edit Vendor' : 'Tambah Vendor'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Nama Vendor
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                  placeholder="Masukkan nama vendor"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Info Kontak
                </label>
                <input
                  type="text"
                  value={formData.contact_info}
                  onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                  placeholder="Masukkan info kontak (email/telepon)"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Alamat
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                  placeholder="Masukkan alamat vendor"
                  rows={3}
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
                    setEditingVendor(null);
                    setFormData({ name: '', contact_info: '', address: '' });
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
              <th className="text-left text-orange-500 py-2">Nama Vendor</th>
              <th className="text-left text-orange-500 py-2">Info Kontak</th>
              <th className="text-left text-orange-500 py-2">Alamat</th>
              <th className="text-left text-orange-500 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="border-b border-gray-200">
                <td className="py-2 text-orange-500">{vendor.id}</td>
                <td className="py-2 text-orange-500">{vendor.name}</td>
                <td className="py-2 text-orange-500">{vendor.contact_info}</td>
                <td className="py-2 text-orange-500">{vendor.address}</td>
                <td className="py-2 text-orange-500">
                  <button
                    onClick={() => handleEdit(vendor)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vendor.id)}
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

export default Vendors;