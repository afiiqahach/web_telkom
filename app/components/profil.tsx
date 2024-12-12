// 'use client';

// import React, { useEffect, useState } from "react";
// import { database, storage } from "@/lib/firebaseConfig";
// import { ref as dbRef, onValue, set } from "firebase/database";
// import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// type Contact = {
//   id: string;
//   userName: string;
//   email: string;
//   role: string;
//   photoUrl?: string; // Optional photo URL
// };

// type UserProfile = {
//   userName: string;
//   email: string;
//   photoUrl?: string;
// };

// const ContactTable = () => {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [newPhoto, setNewPhoto] = useState<File | null>(null); // State for new photo upload
//   const [photoToUpload, setPhotoToUpload] = useState<string | null>(null); // State for which contact to upload photo for

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const userPhotoUrl = user.photoURL || '';  // Default to empty string if no photo
//         setUserProfile({
//           userName: user.displayName || "Unknown",
//           email: user.email || "",
//           photoUrl: userPhotoUrl,
//         });
//       } else {
//         setUserProfile(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const contactRef = dbRef(database, "contacts");
//     onValue(contactRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const contactList = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setContacts(contactList);
//       }
//     });
//   }, []);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, contactId: string) => {
//     const file = e.target.files?.[0] || null;
//     setNewPhoto(file);
//     setPhotoToUpload(contactId); // Set the contact id for upload
//   };

//   const handlePhotoUpload = async () => {
//     if (!newPhoto || !photoToUpload) {
//       alert("Please select a photo to upload.");
//       return;
//     }

//     const contactId = photoToUpload; // Get the selected contact ID
//     const storagePath = `contactPhotos/${contactId}/${uuidv4()}`;
//     const photoRef = storageRef(storage, storagePath);

//     try {
//       // Upload file to Firebase Storage
//       await uploadBytes(photoRef, newPhoto);

//       // Get the download URL
//       const photoUrl = await getDownloadURL(photoRef);

//       // Update the contact in Firebase Realtime Database with the new photo URL
//       const contactRef = dbRef(database, `contacts/${contactId}`);
//       await set(contactRef, {
//         ...contacts.find((contact) => contact.id === contactId),
//         photoUrl,
//       });

//       // Update the contacts state to reflect the new photo
//       setContacts((prevContacts) =>
//         prevContacts.map((contact) =>
//           contact.id === contactId ? { ...contact, photoUrl } : contact
//         )
//       );

//       // Clear the selected photo and reset the photoToUpload state
//       setNewPhoto(null);
//       setPhotoToUpload(null);

//     } catch (error) {
//       console.error("Error uploading photo:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 mt-20">
//       {/* Tabel kontak */}
//       <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl w-full">
//         <h2 className="text-xl font-bold text-[#104C98] mb-4 text-center">
//           User Profile
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-[#104C98] text-white">
//                 <th className="border border-gray-300 px-4 py-2">Username</th>
//                 <th className="border border-gray-300 px-4 py-2">Email</th>
//                 <th className="border border-gray-300 px-4 py-2">Role</th>
//                 <th className="border border-gray-300 px-4 py-2">Photo</th>
//                 <th className="border border-gray-300 px-4 py-2">Upload Photo</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Display logged-in user in the table */}
//               {userProfile && (
//               <tr className="bg-gray-200">
//                 <td className="border border-gray-300 px-4 py-2">{userProfile.userName}</td>
//                 <td className="border border-gray-300 px-4 py-2">{userProfile.email}</td>
//                 <td className="border border-gray-300 px-4 py-2">N/A</td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   {userProfile.photoUrl ? (
//                     <img
//                       src={userProfile.photoUrl}
//                       alt={userProfile.userName}
//                       className="w-12 h-12 rounded-full mx-auto"
//                     />
//                   ) : (
//                     <span>No Photo</span>
//                   )}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   <input
//                     type="file"
//                     onChange={(e) => handleFileChange(e, userProfile.userName)}
//                   />
//                   <button
//                     onClick={handlePhotoUpload}
//                     className="bg-[#104C98] text-white py-1 px-3 mt-2 rounded hover:bg-[#083661]"
//                   >
//                     Upload
//                   </button>
//                 </td>
//               </tr>
//             )}

//               {/* Map over the contacts to display other user data */}
//               {contacts.map((contact) => (
//                 <tr
//                   key={contact.id}
//                   className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
//                 >
//                   <td className="border border-gray-300 px-4 py-2">{contact.userName}</td>
//                   <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
//                   <td className="border border-gray-300 px-4 py-2">{contact.role}</td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {contact.photoUrl ? (
//                       <img
//                         src={contact.photoUrl}
//                         alt={contact.userName}
//                         className="w-12 h-12 rounded-full mx-auto"
//                       />
//                     ) : (
//                       <span>No Photo</span>
//                     )}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     <input
//                       type="file"
//                       onChange={(e) => handleFileChange(e, contact.id)}
//                     />
//                     <button
//                       onClick={handlePhotoUpload}
//                       className="bg-[#104C98] text-white py-1 px-3 mt-2 rounded hover:bg-[#083661]"
//                     >
//                       Upload
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactTable;


'use client';

import React, { useEffect, useState } from "react";
import { database, storage } from "@/lib/firebaseConfig";
import { ref as dbRef, onValue, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";

type Contact = {
  id: string;
  userName: string;
  email: string;
  // role: string;
  photoUrl?: string; // Optional photo URL
  password?: string; // Add password field
};

type UserProfile = {
  userName: string;
  email: string;
  photoUrl?: string;
  password: string; // Add password field to UserProfile
};

const ContactTable = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [newPhoto, setNewPhoto] = useState<File | null>(null); // State for new photo upload
  const [photoToUpload, setPhotoToUpload] = useState<string | null>(null); // State for which contact to upload photo for
  const [newPassword, setNewPassword] = useState<string>(''); // For storing the new password
  const [showPassword, setShowPassword] = useState<boolean>(false); // To toggle password visibility

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userPhotoUrl = user.photoURL || '';  // Default to empty string if no photo
        setUserProfile({
          userName: user.displayName || "Unknown",
          email: user.email || "",
          photoUrl: userPhotoUrl,
          password: '', // Initialize with an empty password field for display
        });
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const contactRef = dbRef(database, "contacts");
    onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const contactList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setContacts(contactList);
      }
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, contactId: string) => {
    const file = e.target.files?.[0] || null;
    setNewPhoto(file);
    setPhotoToUpload(contactId); // Set the contact id for upload
  };

  const handlePhotoUpload = async () => {
    if (!newPhoto || !photoToUpload) {
      alert("Please select a photo to upload.");
      return;
    }

    const contactId = photoToUpload; // Get the selected contact ID
    const storagePath = `contactPhotos/${contactId}/${uuidv4()}`;
    const photoRef = storageRef(storage, storagePath);

    try {
      // Upload file to Firebase Storage
      await uploadBytes(photoRef, newPhoto);

      // Get the download URL
      const photoUrl = await getDownloadURL(photoRef);

      // Update the contact in Firebase Realtime Database with the new photo URL
      const contactRef = dbRef(database, `contacts/${contactId}`);
      await set(contactRef, {
        ...contacts.find((contact) => contact.id === contactId),
        photoUrl,
      });

      // Update the contacts state to reflect the new photo
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === contactId ? { ...contact, photoUrl } : contact
        )
      );

      // Clear the selected photo and reset the photoToUpload state
      setNewPhoto(null);
      setPhotoToUpload(null);

    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (!userProfile) return;

    const auth = getAuth();
    const user = auth.currentUser;

    if (user && newPassword) {
      try {
        await updatePassword(user, newPassword);
        alert("Password updated successfully!");
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Error updating password.");
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-100 p-20">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h2 className="text-xl font-bold text-[#104C98] mb-4 text-center">User Profile</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#104C98] text-white">
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                {/* <th className="border border-gray-300 px-4 py-2">Role</th> */}
                <th className="border border-gray-300 px-4 py-2">Photo</th>
                <th className="border border-gray-300 px-4 py-2">Password</th>
                <th className="border border-gray-300 px-4 py-2">Upload Photo</th>
              </tr>
            </thead>
            <tbody>
              {userProfile && (
                <tr className="bg-gray-200">
                  <td className="border border-gray-300 px-4 py-2">{userProfile.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">{userProfile.email}</td>
                  {/* <td className="border border-gray-300 px-4 py-2">N/A</td> */}
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {userProfile.photoUrl ? (
                      <img
                        src={userProfile.photoUrl}
                        alt={userProfile.userName}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    ) : (
                      <span>No Photo</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={userProfile.password || ''}
                        readOnly // Make it read-only, as this is the stored password
                        className="border border-gray-300 p-2 rounded"
                        placeholder="Password"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-3 text-sm text-blue-500"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="mt-2">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                        placeholder="Enter new password"
                      />
                      <button
                        onClick={handlePasswordChange}
                        className=" bg-[#104C98] text-white py-1 px-3 mx-3 rounded hover:bg-[#083661]"
                      >
                        Update Password
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, userProfile.userName)}
                    />
                    <button
                      onClick={handlePhotoUpload}
                      className="bg-[#104C98] text-white py-1 px-3 mt-2 rounded hover:bg-[#083661]"
                    >
                      Upload
                    </button>
                  </td>
                </tr>
              )}

              {contacts.map((contact) => (
                <tr key={contact.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
                  <td className="border border-gray-300 px-4 py-2">{contact.userName}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                  {/* <td className="border border-gray-300 px-4 py-2">{contact.role}</td> */}
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {contact.photoUrl ? (
                      <img
                        src={contact.photoUrl}
                        alt={contact.userName}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    ) : (
                      <span>No Photo</span>
                    )}
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2 text-center">N/A</td> */}
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, contact.id)}
                    />
                    <button
                      onClick={handlePhotoUpload}
                      className="bg-[#104C98] text-white py-1 px-3 mt-2 rounded hover:bg-[#083661]"
                    >
                      Upload
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
