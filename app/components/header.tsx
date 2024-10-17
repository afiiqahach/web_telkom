// 'use client'
// // Import ikon dari Heroicons
// import { SearchIcon, UserIcon, ChevronDownIcon } from '@heroicons/react/outline';
// import { useEffect, useState } from 'react';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { useRouter } from 'next/navigation'; // Untuk routing
// import { auth } from '@/lib/firebaseConfig'; // Sesuaikan dengan path Firebase Anda

// const Header = () => {
//   const [user, setUser] = useState<{ displayName: string | null, email: string | null } | null>(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // Untuk mengontrol dropdown
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser({
//           displayName: currentUser.displayName,
//           email: currentUser.email,
//         });
//       } else {
//         setUser(null); 
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       router.push('/login');
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   const handleLoginRedirect = () => {
//     router.push('/login');
//   };

//   return (
//     <div className="flex justify-between items-center px-16 py-2 border-b shadow-md bg-white">
//       {/* Search Input */}
//       <div className="relative w-[440px]">
//         <input 
//           type="text" 
//           placeholder="Search in site" 
//           className="border rounded-lg p-2 pl-10 pr-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//         />
//         <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//       </div>

//       {/* Profil dan Nama */}
//       <div className="relative border border-gray-300 rounded-lg w-60 bg-white shadow-sm">
//         <div
//           className="w-60 h-[58px] relative cursor-pointer flex items-center gap-20 hover:bg-gray-100 transition-all duration-300 rounded-lg"
//           onClick={() => setDropdownOpen(!dropdownOpen)} 
//         >
//           <div className="flex items-center">
//             <UserIcon className="h-10 w-10 text-black ml-2" />
//             <div className="ml-4">
//               <div className="text-[#232738] text-sm font-semibold">
//                 {user ? (user.displayName || user.email) : "Guest"}
//               </div>
//               <div className="text-[#555353] text-xs font-medium">{user ? "User" : "Admin"}</div>
//             </div>
//           </div>
//           <ChevronDownIcon className="h-5 w-5 text-black ml-2" />
//         </div>

//         {/* Dropdown Menu */}
//         {dropdownOpen && (
//           <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 transition-all duration-300">
//             {user ? (
//               <button
//                 onClick={handleSignOut} 
//                 className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
//               >
//                 Sign Out
//               </button>
//             ) : (
//               <button
//                 onClick={handleLoginRedirect} 
//                 className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
//               >
//                 Login
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

'use client';
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
        });
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
      console.error("Error signing out: ", error);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const navigateToDashboard = () => {
    router.push("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center ps-5 pe-16 py-2 border-b shadow-md bg-white z-50">
      <div className="flex left-0 justify-start bg-white shadow-sm">
        <img src="img/logokecil.png" alt="Telkom" className="h-10" />
        <button
          className="text-2xl font-bold ps-4 text-[#104C98] hover:text-black"
          onClick={navigateToDashboard}
        >
          ARINA
        </button>
      </div>
      {/* Search Input */}
      <div className="relative w-[440px]">
        <input 
          type="text" 
          placeholder="Search in site" 
          className="border rounded-lg p-2 pl-10 pr-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
        />
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Profil dan Nama */}
      <div className="relative border border-gray-300 rounded-lg w-60 bg-white shadow-sm">
        <div
          className="w-60 h-[58px] relative cursor-pointer flex items-center gap-20 hover:bg-gray-100 transition-all duration-300 rounded-lg"
          onClick={() => setDropdownOpen(!dropdownOpen)} 
        >
          <div className="flex items-center">
            <UserIcon className="h-10 w-10 text-black ml-2" />
            <div className="ml-4">
              <div className="text-[#232738] text-sm font-semibold">
                {user ? (user.displayName || user.email) : "Guest"}
              </div>
              <div className="text-[#555353] text-xs font-medium">{user ? "User" : "Admin"}</div>
            </div>
          </div>
          <ChevronDownIcon className="h-5 w-5 text-black ml-2" />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 transition-all duration-300">
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
  );
};

export default Header;
