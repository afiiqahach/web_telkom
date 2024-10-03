'use client'
// Import ikon dari Heroicons
import { SearchIcon, UserIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Untuk routing
import { auth } from '@/lib/firebaseConfig'; // Sesuaikan dengan path Firebase Anda

const Header = () => {
  const [user, setUser] = useState<{ displayName: string | null, email: string | null } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Untuk mengontrol dropdown
  const router = useRouter();

  useEffect(() => {
    // Mendapatkan informasi pengguna yang sedang login
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
        });
      } else {
        setUser(null); // Tidak ada pengguna yang login
      }
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

  // Fungsi untuk Sign Out dan mengarahkan ke halaman login
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Proses logout dengan Firebase
      router.push('/login'); // Arahkan pengguna ke halaman login
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // Arahkan ke halaman login
  };

  return (
    <div className="flex justify-between items-center px-16 py-2 border-b">
      {/* Search Input */}
      <div className="relative w-[440px]">
        <input 
          type="text" 
          placeholder="Search in site" 
          className="border rounded-lg p-2 pl-10 pr-4 w-full" // Padding left untuk ikon pencarian
        />
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>

      {/* Profil dan Nama */}
      <div className="relative border border-gray-300 rounded-lg w-60 ">
        <div
          className="w-60 h-[58px] relative cursor-pointer flex items-center gap-20 hover:bg-gray-200"
          onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
        >
          <div className="flex items-center hover:bg-gray-200 rounded-lg">
            {/* Ikon Profil */}
            <UserIcon className="h-10 w-10 text-black ml-2" />
            <div className="left-[73px] top-[11px] ml-4">
              <div className="text-[#232738] text-sm font-semibold ">
                {user ? (user.displayName || user.email) : "Guest"}
              </div>
              <div className="text-[#555353] text-xs font-medium">{user ? "User" : "Admin"}</div>
            </div>
          </div>
          <ChevronDownIcon className="h-5 w-5 text-black ml-2" />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
            {user ? (
              <button
                onClick={handleSignOut} // Fungsi Sign Out
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={handleLoginRedirect} // Fungsi untuk mengarahkan ke login
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
