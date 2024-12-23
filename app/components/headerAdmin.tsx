'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/outline';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseConfig.js';
import NotificationDropdown from './NotificationDropdown';

const ADMIN_EMAIL = "arina@gmail.com"; // Email admin yang ditentukan

const Header = () => {
  const [user, setUser] = useState<{ displayName: string | null; email: string | null } | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User:', currentUser); // Debugging untuk memastikan data pengguna
        setUser({ displayName: currentUser.email === ADMIN_EMAIL ? 'Arina' : currentUser.displayName,
            email: currentUser.email, });
      } else {
        console.log('No user is logged in');
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
      console.error('Error signing out:', error);
    }
  };

  const handleLoginRedirect = () => router.push('/login');
  const navigateToDashboard = () => router.push('/admin');
//   const navigateToProfile = () => router.push('/profile');

  const isAdmin = user?.email === ADMIN_EMAIL;

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

      {/* Profil dan Notifikasi */}
      <div className="flex items-center gap-4">
        {/* Notifikasi */}
        <NotificationDropdown />

        {/* Profil */}
        <div className="relative">
          <button
            className="flex items-center justify-between border border-gray-300 rounded-lg w-60 bg-white shadow-sm p-2 hover:bg-gray-100 transition-all duration-300"
            onClick={() => setProfileDropdownOpen((prev) => !prev)}
          >
            <div className="flex">
              <UserIcon className="h-10 w-10 text-black" />
              <div className="flex flex-col items-start ml-4">
                <div className="text-[#232738] text-sm font-semibold">
                  {isAdmin ? 'Arina' : user?.displayName || user?.email || 'Admin'}
                </div>
                <div className="text-[#555353] text-xs">
                  {isAdmin ? 'Admin' : user ? 'Admin' : 'Admin'}
                </div>
              </div>
            </div>
            <ChevronDownIcon className="h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              {user ? (
                <>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all border"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLoginRedirect}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                >
                  SignOut
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
