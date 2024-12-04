// import { useState, useEffect } from 'react';
// import { BellIcon } from '@heroicons/react/outline';
// import { getDatabase, ref, onValue } from 'firebase/database';

// const NotificationDropdown = () => {
//   const [notifications, setNotifications] = useState<string[]>([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   useEffect(() => {
//     const db = getDatabase();
//     const notificationsRef = ref(db, 'tickets'); // Ganti path ini sesuai data Anda

//     const unsubscribe = onValue(notificationsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const newNotifications = Object.values(data).map((item) => {
//           // Validasi tipe data dan ambil INCIDENT
//           const notification = item as { INCIDENT?: string };
//           return notification.INCIDENT || "Notifikasi tanpa ringkasan";
//         });
    
//         const latestNotification = newNotifications[newNotifications.length - 1];
    
//         // Perbarui state
//         setNotifications(newNotifications);
    
//         // Tampilkan notifikasi browser
//         triggerBrowserNotification(latestNotification);
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
//       new Notification("Notifikasi Baru", { body: message });
//     } else if (Notification.permission !== "denied") {
//       Notification.requestPermission().then((permission) => {
//         if (permission === "granted") {
//           new Notification("Notifikasi Baru", { body: message });
//         }
//       });
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200"
//         onClick={() => setShowNotifications(!showNotifications)}
//       >
//         <BellIcon className="h-6 w-6 text-gray-700" />
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
//             {notifications.length}
//           </span>
//         )}
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
//                   {notification}
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
import { format } from 'date-fns'; // Pastikan Anda menginstal date-fns

type Ticket = {
  INCIDENT: string;
  REPORTED_DATE: string; // Tanggal dalam format string
  // [key: string]: any; // Tambahkan jika ada properti lain yang tidak relevan
};

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const notificationsRef = ref(db, 'tickets'); // Ganti path ini sesuai data Anda

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Tanggal hari ini dalam format 'YYYY-MM-DD'
        const today = format(new Date(), 'yyyy-MM-dd'); // Sesuaikan format jika diperlukan

        // Filter data berdasarkan tanggal hari ini dan ambil INCIDENT
        const filteredNotifications = Object.values(data as Record<string, Ticket>)
        .filter((item) => item.REPORTED_DATE === today) // Bandingkan tanggal
        .map((item) => item.INCIDENT) // Ambil hanya INCIDENT
        .filter((incident) => !!incident); // Hapus nilai kosong

        // Jika ada data baru, tambahkan notifikasi browser
        if (filteredNotifications.length > 0) {
          const latestNotification = filteredNotifications[filteredNotifications.length - 1];
          triggerBrowserNotification(latestNotification);
        }

        // Perbarui state dengan notifikasi terbaru
        setNotifications(filteredNotifications);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fungsi untuk memicu notifikasi browser
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

  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <BellIcon className="h-6 w-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
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
