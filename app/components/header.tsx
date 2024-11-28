'use client';

import { useEffect, useState } from 'react';
import { SearchIcon, UserIcon } from '@heroicons/react/outline';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseConfig.js';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const [user, setUser] = useState<{ displayName: string | null; email: string | null } | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // Kontrol visibilitas dropdown profil
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ displayName: currentUser.displayName, email: currentUser.email });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const navigateToDashboard = () => {
    router.push('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-5 py-2 border-b shadow-md bg-white z-50">
      {/* Logo dan Dashboard Navigation */}
      <div className="flex items-center">
        <img src="/img/logokecil.png" alt="Logo" className="h-10" />
        <button
          className="text-2xl font-bold px-4 text-[#104C98] hover:text-black"
          onClick={navigateToDashboard}
        >
          ARINA
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-[440px]">
        <input
          type="text"
          placeholder="Search in site"
          className="border rounded-lg p-2 pl-10 pr-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Profil dan Notifikasi */}
      <div className="flex items-center gap-4">
        {/* Notifikasi */}
        <NotificationDropdown />

        {/* Profil */}
        <div className="relative">
          <button
            className="flex items-center border border-gray-300 rounded-lg w-60 bg-white shadow-sm p-2 hover:bg-gray-100 transition-all duration-300"
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
          >
            <UserIcon className="h-10 w-10 text-black" />
            <div className="ml-4">
              <div className="text-[#232738] text-sm font-semibold">
                {user ? user.displayName || user.email : 'Guest'}
              </div>
              <div className="text-[#555353] text-xs font-medium">{user ? 'User' : 'Admin'}</div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={handleLoginRedirect}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;