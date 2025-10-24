'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dasbor' },
    { href: '/departments', label: 'Departemen' },
    { href: '/employees', label: 'Karyawan' },
    { href: '/assets', label: 'Aset' },
    { href: '/categories', label: 'Kategori' },
    { href: '/vendors', label: 'Vendor' },
    { href: '/loans', label: 'Peminjaman' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-red-500">
              Manajemen Aset
            </Link>
          </div>
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-orange-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;