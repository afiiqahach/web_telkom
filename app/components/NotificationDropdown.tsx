'use client'

// import { useState, useEffect } from 'react';
// import { BellIcon } from '@heroicons/react/outline';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { format } from 'date-fns'; // Pastikan Anda menginstal date-fns

// type Ticket = {
//   INCIDENT: string;
//   REPORTED_DATE: string; // Tanggal dalam format string
//   // [key: string]: any; // Tambahkan jika ada properti lain yang tidak relevan
// };

// const NotificationDropdown = () => {
//   const [notifications, setNotifications] = useState<string[]>([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   useEffect(() => {
//     const db = getDatabase();
//     const notificationsRef = ref(db, 'tickets');
  
//     const unsubscribe = onValue(notificationsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const today = format(new Date(), 'yyyy-MM-dd'); // Hanya tanggal
  
//         // Filter data baru berdasarkan tanggal
//         const filteredNotifications = Object.values(data as Record<string, Ticket>)
//           .filter((item) => item.REPORTED_DATE.startsWith(today)) // Perbandingan hanya tanggal
//           .map((item) => item.INCIDENT)
//           .filter((incident) => !!incident);
  
//         // Perbarui state dengan data baru yang belum ditampilkan
//         setNotifications((prevNotifications) => {
//           const newNotifications = filteredNotifications.filter(
//             (notification) => !prevNotifications.includes(notification)
//           );
  
//           // Tampilkan notifikasi browser untuk data baru
//           newNotifications.forEach((notification) => triggerBrowserNotification(notification));
  
//           return [...prevNotifications, ...newNotifications];
//         });
//       }
//     });
  
//     return () => unsubscribe();
//   }, []);

//   // Fungsi untuk memicu notifikasi browser
//   const triggerBrowserNotification = (message: string) => {
//     if (!("Notification" in window)) {
//       console.warn("Browser Anda tidak mendukung notifikasi.");
//       return;
//     }

//     if (Notification.permission === "granted") {
//       new Notification("Notifikasi Baru", { body: `INCIDENT: ${message}` });
//     } else if (Notification.permission !== "denied") {
//       Notification.requestPermission().then((permission) => {
//         if (permission === "granted") {
//           new Notification("Notifikasi Baru", { body: `INCIDENT: ${message}` });
//         }
//       });
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         className="relative hover:bg-gray-200 rounded-full"
//         onClick={() => setShowNotifications(!showNotifications)}
//       >
//         <BellIcon className="h-6 w-6 text-gray-700" />
//         {/* {notifications.length > 0 && ( */}
//           <span className="absolute top-0 right-0 block items-center justify-center w-2 h-2 text-xs font-bold text-white bg-red-500 rounded-full">
//             {/* {notifications.length} */}
//           </span>
//         {/* )} */}
//       </button>

//       {showNotifications && (
//         <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
//           {notifications.length > 0 ? (
//             <ul className="p-4 space-y-2 max-h-72 overflow-y-auto">
//               {notifications.map((notification, index) => (
//                 <li
//                   key={index}
//                   className="text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md"
//                 >
//                   INCIDENT: {notification}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="p-4 text-sm text-gray-700">Tidak ada notifikasi baru</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationDropdown;


import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/outline';
import { getDatabase, ref, onValue } from 'firebase/database';
import { format } from 'date-fns';

type Ticket = {
  INCIDENT: string;
  REPORTED_DATE: string; // Tanggal dalam format string
};

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [hasNewData, setHasNewData] = useState(false); // State untuk tanda titik
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const notificationsRef = ref(db, 'tickets');

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const today = format(new Date(), 'yyyy-MM-dd');

        // Filter data baru berdasarkan tanggal
        const filteredNotifications = Object.values(data as Record<string, Ticket>)
          .filter((item) => item.REPORTED_DATE.startsWith(today))
          .map((item) => item.INCIDENT)
          .filter((incident) => !!incident);

        // Perbarui state dengan data baru yang belum ditampilkan
        setNotifications((prevNotifications) => {
          const newNotifications = filteredNotifications.filter(
            (notification) => !prevNotifications.includes(notification)
          );

          if (newNotifications.length > 0) {
            setHasNewData(true); // Tampilkan tanda titik jika ada data baru
          }

          // Update jumlah notifikasi baru
          setNewNotificationCount(newNotifications.length);

          // Tampilkan notifikasi browser untuk data baru
          newNotifications.forEach((notification) => triggerBrowserNotification(notification));

          return [...prevNotifications, ...newNotifications];
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const triggerBrowserNotification = (message: string) => {
    if (!("Notification" in window)) {
      console.warn("Browser Anda tidak mendukung notifikasi.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification("Notifikasi Baru", { body: `INCIDENT: ${message}` });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Notifikasi Baru", { body: `INCIDENT: ${message}` });
        }
      });
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setHasNewData(false); // Hilangkan tanda titik setelah dropdown dibuka
  };

  return (
    <div className="relative">
      <button
        className="relative hover:bg-gray-200 rounded-full"
        onClick={handleNotificationClick}
      >
        <BellIcon className="h-6 w-6 text-gray-700" />
        {hasNewData && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
          <div className="p-4 text-sm text-gray-700 font-bold">
            Data masuk: {newNotificationCount}
          </div>
          {notifications.length > 0 ? (
            <ul className="p-4 space-y-2 max-h-72 overflow-y-auto">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md"
                >
                  INCIDENT: {notification}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-sm text-gray-700">Tidak ada notifikasi baru</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

