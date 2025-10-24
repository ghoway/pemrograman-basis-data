'use client';

import { useEffect, useState } from 'react';
import { Combobox, Listbox, Dialog } from '@headlessui/react';

interface Asset {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  name: string;
}

interface Loan {
  id: string;
  asset_id: number;
  employee_id: number;
  borrow_date: string;
  expected_return_date: string;
  actual_return_date: string | null;
  return_condition: string | null;
  status: string;
}

const Loans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [borrowFormData, setBorrowFormData] = useState({
    asset_id: '',
    employee_id: '',
    expected_return_date: '',
  });
  const [returnFormData, setReturnFormData] = useState({
    loan_id: '',
    return_condition: '',
  });
  const [queryAsset, setQueryAsset] = useState('');
  const [queryEmployee, setQueryEmployee] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const filteredAssets = (queryAsset === ''
    ? assets
    : assets.filter((asset) =>
        asset.name.toLowerCase().includes(queryAsset.toLowerCase())
      )).filter(asset => asset.status === 'available');

  const filteredEmployees = queryEmployee === ''
    ? employees
    : employees.filter((employee) =>
        employee.name.toLowerCase().includes(queryEmployee.toLowerCase())
      );

  const filteredLoans = loans.filter(loan => loan.status === 'active');

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
    fetchLoans();
    fetchAssets();
    fetchEmployees();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/transactions/loans');
      const data = await res.json();
      setLoans(data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const fetchAssets = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/assets');
      const data = await res.json();
      setAssets(data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/employees');
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleBorrowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/transactions/borrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asset_id: parseInt(borrowFormData.asset_id),
          employee_id: parseInt(borrowFormData.employee_id),
          expected_return_date: borrowFormData.expected_return_date,
        }),
      });
      if (res.ok) {
        fetchLoans();
        setShowBorrowForm(false);
        setBorrowFormData({ asset_id: '', employee_id: '', expected_return_date: '' });
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Terjadi kesalahan saat meminjam aset');
      }
    } catch (error) {
      console.error('Error borrowing asset:', error);
    }
  };

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/transactions/return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loan_id: returnFormData.loan_id,
          return_condition: returnFormData.return_condition,
        }),
      });
      if (res.ok) {
        fetchLoans();
        setShowReturnForm(false);
        setReturnFormData({ loan_id: '', return_condition: '' });
      }
    } catch (error) {
      console.error('Error returning asset:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Peminjaman
        </h1>
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setShowBorrowForm(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Pinjam Aset
        </button>
        <button
          onClick={() => setShowReturnForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Kembalikan Aset
        </button>
      </div>
      {showBorrowForm && (
        <div className="mb-8 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Pinjam Aset
              </h2>
            </div>
            <form onSubmit={handleBorrowSubmit} className="space-y-4">
               <div className="space-y-2">
                <label className="text-gray-700 flex items-center text-sm font-medium">
                  <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Aset
                </label>
                <Combobox value={borrowFormData.asset_id} onChange={(value) => setBorrowFormData({ ...borrowFormData, asset_id: value })}>
                  <div className="relative">
                    <Combobox.Input
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                      placeholder="Pilih aset"
                      onChange={(event) => setQueryAsset(event.target.value)}
                      displayValue={(id: string) => assets.find(a => a.id.toString() === id)?.name || ''}
                      required
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Combobox.Button>
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredAssets.map((asset) => (
                        <Combobox.Option
                          key={asset.id}
                          value={asset.id.toString()}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {asset.name}
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
                  <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Karyawan
                </label>
                <Combobox value={borrowFormData.employee_id} onChange={(value) => setBorrowFormData({ ...borrowFormData, employee_id: value })}>
                  <div className="relative">
                    <Combobox.Input
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                      placeholder="Pilih karyawan"
                      onChange={(event) => setQueryEmployee(event.target.value)}
                      displayValue={(id: string) => employees.find(e => e.id.toString() === id)?.name || ''}
                      required
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Combobox.Button>
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredEmployees.map((employee) => (
                        <Combobox.Option
                          key={employee.id}
                          value={employee.id.toString()}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {employee.name}
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
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Tanggal Pengembalian Diharapkan
                </label>
                <input
                  type="date"
                  value={borrowFormData.expected_return_date}
                  onChange={(e) => setBorrowFormData({ ...borrowFormData, expected_return_date: e.target.value })}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-gray-800"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded transition-all duration-300">
                  Pinjam
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBorrowForm(false);
                    setBorrowFormData({ asset_id: '', employee_id: '', expected_return_date: '' });
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
      {showReturnForm && (
        <div className="mb-8 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Kembalikan Aset
              </h2>
            </div>
            <form onSubmit={handleReturnSubmit} className="space-y-4">
               <div className="space-y-2">
                 <label className="text-gray-700 flex items-center text-sm font-medium">
                   <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                   </svg>
                   Pilih Peminjaman
                 </label>
                 <Combobox value={returnFormData.loan_id} onChange={(value) => setReturnFormData({ ...returnFormData, loan_id: value })}>
                   <div className="relative">
                     <Combobox.Input
                       className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded placeholder-gray-500 text-gray-800"
                       placeholder="Pilih peminjaman"
                       displayValue={(id: string) => {
                         const loan = loans.find(l => l.id === id);
                         if (loan) {
                           const asset = assets.find(a => a.id === loan.asset_id);
                           return asset ? `${asset.name} (${loan.id})` : loan.id;
                         }
                         return '';
                       }}
                       required
                     />
                     <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                       <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </Combobox.Button>
                     <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                       {filteredLoans.map((loan) => {
                         const asset = assets.find(a => a.id === loan.asset_id);
                         return (
                           <Combobox.Option
                             key={loan.id}
                             value={loan.id}
                             className={({ active }) =>
                               `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                 active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                               }`
                             }
                           >
                             {({ selected }) => (
                               <>
                                 <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                   {asset ? `${asset.name} (${loan.id})` : loan.id}
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
                         );
                       })}
                     </Combobox.Options>
                   </div>
                 </Combobox>
               </div>
               <div className="space-y-2">
                 <label className="text-gray-700 flex items-center text-sm font-medium">
                   <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   Kondisi Pengembalian
                 </label>
                 <Listbox value={returnFormData.return_condition} onChange={(value) => setReturnFormData({ ...returnFormData, return_condition: value })}>
                   <div className="relative">
                     <Listbox.Button className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-gray-800 text-left">
                       {returnFormData.return_condition === 'good' ? 'Baik' : returnFormData.return_condition === 'damaged' ? 'Rusak' : 'Pilih Kondisi'}
                     </Listbox.Button>
                     <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                       <Listbox.Option
                         value="good"
                         className={({ active }) =>
                           `relative cursor-default select-none py-2 pl-3 pr-4 ${
                             active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                           }`
                         }
                       >
                         Baik
                       </Listbox.Option>
                       <Listbox.Option
                         value="damaged"
                         className={({ active }) =>
                           `relative cursor-default select-none py-2 pl-3 pr-4 ${
                             active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                           }`
                         }
                       >
                         Rusak
                       </Listbox.Option>
                     </Listbox.Options>
                   </div>
                 </Listbox>
               </div>
              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded transition-all duration-300">
                  Kembalikan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReturnForm(false);
                    setReturnFormData({ loan_id: '', return_condition: '' });
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
              <th className="text-left text-orange-500 py-2">ID Peminjaman</th>
              <th className="text-left text-orange-500 py-2">Nama Aset</th>
              <th className="text-left text-orange-500 py-2">Nama Peminjam</th>
              <th className="text-left text-orange-500 py-2">Tanggal Pinjam</th>
              <th className="text-left text-orange-500 py-2">Detail</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => {
              const asset = assets.find(a => a.id === loan.asset_id);
              const employee = employees.find(e => e.id === loan.employee_id);
              return (
                <tr key={loan.id} className="border-b border-gray-200">
                  <td className="py-2 text-orange-500">{loan.id}</td>
                  <td className="py-2 text-orange-500">{asset ? asset.name : 'Unknown'}</td>
                  <td className="py-2 text-orange-500">{employee ? employee.name : 'Unknown'}</td>
                  <td className="py-2 text-orange-500">{loan.borrow_date}</td>
                  <td className="py-2 text-orange-500">
                    <button
                      onClick={() => {
                        setSelectedLoan(loan);
                        setShowDetailModal(true);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showDetailModal && selectedLoan && (
        <Dialog open={showDetailModal} onClose={() => setShowDetailModal(false)} className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowDetailModal(false)} />
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6" onClick={(e) => e.stopPropagation()}>
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">Detail Peminjaman</Dialog.Title>
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">ID Peminjaman:</td>
                    <td className="py-2 text-gray-900">{selectedLoan.id}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Nama Aset:</td>
                    <td className="py-2 text-gray-900">{assets.find(a => a.id === selectedLoan.asset_id)?.name || 'Unknown'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Nama Peminjam:</td>
                    <td className="py-2 text-gray-900">{employees.find(e => e.id === selectedLoan.employee_id)?.name || 'Unknown'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Tanggal Pinjam:</td>
                    <td className="py-2 text-gray-900">{selectedLoan.borrow_date}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Tanggal Pengembalian Diharapkan:</td>
                    <td className="py-2 text-gray-900">{selectedLoan.expected_return_date}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Tanggal Pengembalian Aktual:</td>
                    <td className="py-2 text-gray-900">{selectedLoan.actual_return_date || 'Belum dikembalikan'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Kondisi Saat Dikembalikan:</td>
                    <td className="py-2 text-gray-900">{selectedLoan.return_condition || 'Belum dikembalikan'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-900">Status:</td>
                    <td className="py-2 text-gray-900">{selectedLoan.status}</td>
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
    </div>
  );
};

export default Loans;