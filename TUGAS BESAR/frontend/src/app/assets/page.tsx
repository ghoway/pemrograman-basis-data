'use client';

import { useEffect, useState } from 'react';
import { Combobox, Dialog } from '@headlessui/react';

interface Asset {
  id: number;
  serial_number: string;
  name: string;
  category_id: number;
  status: string;
  vendor_id: number;
  received_date: string;
}

interface Category {
  id: number;
  name: string;
}

interface Vendor {
  id: number;
  name: string;
}

const Assets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState({
    serial_number: '',
    name: '',
    category_id: '',
    vendor_id: '',
    received_date: '',
    status: '',
  });
  const [query, setQuery] = useState('');
  const [queryCategory, setQueryCategory] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredCategories = queryCategory === ''
    ? categories
    : categories.filter((category) =>
        category.name.toLowerCase().includes(queryCategory.toLowerCase())
      );

  const filteredVendors = query === ''
    ? vendors
    : vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDetailModal) {
        setShowDetailModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDetailModal]);

  useEffect(() => {
    fetchAssets();
    fetchCategories();
    fetchVendors();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/assets');
      const data = await res.json();
      setAssets(data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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
    const url = editingAsset
      ? `http://localhost:5000/api/assets/${editingAsset.id}`
      : 'http://localhost:5000/api/assets';
    const method = editingAsset ? 'PUT' : 'POST';

    const data = {
      serial_number: formData.serial_number,
      name: formData.name,
      category_id: parseInt(formData.category_id),
      vendor_id: parseInt(formData.vendor_id),
      received_date: formData.received_date,
    };

    if (editingAsset) {
      data.status = formData.status;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchAssets();
        setShowForm(false);
        setEditingAsset(null);
        setFormData({ serial_number: '', name: '', category_id: '', vendor_id: '', received_date: '', status: '' });
      }
    } catch (error) {
      console.error('Error saving asset:', error);
    }
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setFormData({
      serial_number: asset.serial_number,
      name: asset.name,
      category_id: asset.category_id ? asset.category_id.toString() : '',
      vendor_id: asset.vendor_id ? asset.vendor_id.toString() : '',
      received_date: asset.received_date,
      status: asset.status,
    });
    setShowForm(true);
  };

  const handleDetail = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus aset ini?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/assets/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchAssets();
        }
      } catch (error) {
        console.error('Error deleting asset:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Aset
        </h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Tambah Aset
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
                {editingAsset ? 'Edit Aset' : 'Tambah Aset'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Nomor Seri
                </label>
                <input
                  type="text"
                  value={formData.serial_number}
                  onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                  placeholder="Masukkan nomor seri"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Nama
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                  placeholder="Masukkan nama aset"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Kategori
                </label>
                <Combobox value={formData.category_id} onChange={(value) => setFormData({ ...formData, category_id: value })}>
                  <div className="relative">
                    <Combobox.Input
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                      placeholder="Pilih kategori"
                      onChange={(event) => setQueryCategory(event.target.value)}
                      displayValue={(id: string) => categories.find(c => c.id.toString() === id)?.name || ''}
                      required
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Combobox.Button>
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredCategories.map((category) => (
                        <Combobox.Option
                          key={category.id}
                          value={category.id.toString()}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {category.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
               <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11l-5.5-5.5L4 11h3v8h6v-8h3z" />
                  </svg>
                  Vendor
                </label>
                <Combobox value={formData.vendor_id} onChange={(value) => setFormData({ ...formData, vendor_id: value })}>
                  <div className="relative">
                    <Combobox.Input
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                      placeholder="Pilih vendor"
                      onChange={(event) => setQuery(event.target.value)}
                      displayValue={(id: string) => vendors.find(v => v.id.toString() === id)?.name || ''}
                      required
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Combobox.Button>
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredVendors.map((vendor) => (
                        <Combobox.Option
                          key={vendor.id}
                          value={vendor.id.toString()}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {vendor.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-orange-600">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Tanggal Terima
                </label>
                <input
                  type="date"
                  value={formData.received_date}
                  onChange={(e) => setFormData({ ...formData, received_date: e.target.value })}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-gray-800"
                  required
                />
               </div>
               {editingAsset && (
                 <div className="space-y-2">
                   <label className="text-gray-700 flex items-center text-sm font-medium">
                     <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     Status
                   </label>
                   <select
                     value={formData.status}
                     onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                     className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-gray-800"
                     required
                   >
                     <option value="available">Tersedia</option>
                     <option value="borrowed">Dipinjam</option>
                     <option value="damaged">Rusak</option>
                   </select>
                 </div>
               )}
               <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded transition-all duration-300">
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingAsset(null);
                     setFormData({ serial_number: '', name: '', category_id: '', vendor_id: '', received_date: '', status: '' });
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

      {showDetailModal && selectedAsset && (
        <Dialog open={showDetailModal} onClose={() => setShowDetailModal(false)} className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowDetailModal(false)} />
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6" onClick={(e) => e.stopPropagation()}>
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">Detail Aset</Dialog.Title>
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">ID:</td>
                    <td className="py-2 text-gray-900">{selectedAsset.id}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Nomor Seri:</td>
                    <td className="py-2 text-gray-900">{selectedAsset.serial_number}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Nama:</td>
                    <td className="py-2 text-gray-900">{selectedAsset.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Kategori:</td>
                    <td className="py-2 text-gray-900">{selectedAsset.category_id ? categories.find(c => c.id === selectedAsset.category_id)?.name || 'Unknown' : 'Unknown'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Vendor:</td>
                    <td className="py-2 text-gray-900">{selectedAsset.vendor_id ? vendors.find(v => v.id === selectedAsset.vendor_id)?.name || 'Unknown' : 'Unknown'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Status:</td>
                    <td className="py-2 text-gray-900">
                      {selectedAsset.status === 'available' ? 'Tersedia' :
                       selectedAsset.status === 'borrowed' ? 'Dipinjam' :
                       selectedAsset.status === 'damaged' ? 'Rusak' : selectedAsset.status}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Tanggal Diterima:</td>
                    <td className="py-2 text-gray-900">{selectedAsset.received_date}</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Tutup
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg p-6 hover:bg-white/30 transition-colors overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left text-orange-500 py-2">#</th>
              <th className="text-left text-orange-500 py-2">Nomor Seri</th>
              <th className="text-left text-orange-500 py-2">Nama</th>
              <th className="text-left text-orange-500 py-2">Kategori</th>
              <th className="text-left text-orange-500 py-2">Status</th>
              <th className="text-left text-orange-500 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset.id} className="border-b border-gray-200">
                <td className="py-2 text-orange-500">{index + 1}</td>
                <td className="py-2 text-orange-500">{asset.serial_number}</td>
                <td className="py-2 text-orange-500">{asset.name}</td>
                <td className="py-2 text-orange-500">{asset.category_id ? categories.find(c => c.id === asset.category_id)?.name || 'Unknown' : 'Unknown'}</td>
                <td className="py-2 text-orange-500">
                  {asset.status === 'available' ? 'Tersedia' :
                   asset.status === 'borrowed' ? 'Dipinjam' :
                   asset.status === 'damaged' ? 'Rusak' : asset.status}
                </td>
                <td className="py-2 text-orange-500">
                  <button
                    onClick={() => handleDetail(asset)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleEdit(asset)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(asset.id)}
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

export default Assets;