// 'use client';

// import React, { useState } from 'react';
// import Sidebar from "@/app/components/sidebarAdmin"
// import Header from "@/app/components/headerAdmin";
// import { UserIcon } from '@heroicons/react/outline';

// const UserSettingsPage: React.FC = () => {
//   const [userSettings] = useState({
//     username: 'Arina',
//     email: 'arina@gmail.com',
//     password: 'admin123',
//   });

//   const handleEdit = () => {
//     alert('Edit functionality not implemented!');
//   };

//   return (
//     <div className="min-h-screen pl-72 pr-6 bg-gray-100 px-32">
//       <main className="flex-1 p-6">
//         <div className='mt-14'>
//             <div>
//                 <Sidebar/>
//             </div>
//             <div>
//               <Header/>
//             </div>
//         </div>
        
//         {/* Header */}
//         <header className=" justify-center pt-10">
//           <h1 className="text-2xl font-bold mb-4">Settings</h1>
//         </header>

//         {/* Settings Card */}
//         <div className="bg-white rounded-lg shadow-md">
//           {/* Tab Title */}
//           <div className="bg-gray-50 border-b p-4 rounded-t-lg">
//             <h2 className="text-lg font-medium text-gray-800">Admin Account</h2>
//           </div>

//           {/* Main Content */}
//           <div className="flex flex-col md:flex-row p-6 gap-6">
//               {/* Profile Section */}
//               <div className="flex flex-col items-center gap-4 md:w-1/4">
//                 <div className="w-24 h-24 rounded-full bg-[#083d6b] flex items-center justify-center">
//                   <UserIcon className="w-16 h-16 text-white" />
//                 </div>
//                 <p className="text-gray-700 font-medium">{userSettings.username}</p>
//               </div>

//             {/* User Details Section */}
//             <div className="flex-1 space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-600">Username</label>
//                 <input
//                   type="text"
//                   value={userSettings.username}
//                   disabled
//                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Email</label>
//                 <input
//                   type="email"
//                   value={userSettings.email}
//                   disabled
//                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Password</label>
//                 <input
//                   type="password"
//                   value={userSettings.password}
//                   disabled
//                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex justify-center p-4 bg-gray-50 rounded-b-lg">
//             <button
//               onClick={handleEdit}
//               className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Edit
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserSettingsPage;


'use client';

import React, { useState } from 'react';
import Sidebar from "@/app/components/sidebarAdmin";
import Header from "@/app/components/headerAdmin";
import { UserIcon } from '@heroicons/react/outline';

const UserSettingsPage: React.FC = () => {
  const [userSettings, setUserSettings] = useState({
    username: 'Arina',
    email: 'arina@gmail.com',
    password: 'admin123',
  });
  const [isEditing, setIsEditing] = useState(false); // Mode Edit

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserSettings({ ...userSettings, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Simpan data ke server di sini (jika diperlukan)
    alert('Changes saved!');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-100 mt-20">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        <main className="flex-1 pl-80 pr-10">
          {/* Settings Header */}
          <header className="mb-6 pt-10">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          </header>

          {/* Settings Card */}
          <div className="bg-white rounded-lg shadow-md">
            {/* Tab Title */}
            <div className="bg-gray-50 border-b p-4 rounded-t-lg">
              <h2 className="text-lg font-medium text-gray-800">Admin Account</h2>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row p-6 gap-6">
              {/* Profile Section */}
              <div className="flex flex-col items-center gap-4 md:w-1/4">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
                  <UserIcon className="w-16 h-16 text-white" />
                </div>
                <p className="text-gray-700 font-medium">{userSettings.username}</p>
              </div>

              {/* User Details Section */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm text-gray-600">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={userSettings.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full mt-1 px-3 py-2 border ${
                      isEditing ? 'border-blue-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userSettings.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full mt-1 px-3 py-2 border ${
                      isEditing ? 'border-blue-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={userSettings.password}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full mt-1 px-3 py-2 border ${
                      isEditing ? 'border-blue-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-center p-4 bg-gray-50 rounded-b-lg">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={toggleEdit}
                  className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserSettingsPage;
