'use client';

import { signout } from '../login/actions'; 
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi'; // Menggunakan icon dari react-icons

export default function Sidebar() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signout();
    router.push('/login'); // Redirect ke halaman login setelah logout
  };

  return (
    <aside className="w-64 h-screen bg-gray-200 text-gray-800 flex flex-col p-4 shadow-lg">
      {/* Header Sidebar */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-pink-500">Dashboard</h2>
      </div>

      {/* Navigasi */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <a 
              href="/" 
              className="flex items-center justify-center px-4 py-2 rounded bg-pink-500 text-white hover:bg-blue-400 transition duration-200"
            >
              Home
            </a>
          </li>
        </ul>
      </nav>

      {/* Tombol Sign Out */}
      <div className="mt-4">
        <button 
          onClick={handleSignOut} 
          className="w-full flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded text-sm transition duration-200"
        >
          <FiLogOut className="text-lg" /> {/* Icon Logout */}
          Sign Out
        </button>
      </div>
    </aside>
  );
}
