import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/outline';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications'); // Ganti dengan endpoint API Anda
        const data = await response.json();
        setNotifications(data.notifications);
      } catch (error) {
        console.error('Gagal memuat notifikasi:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200"
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
            <ul className="p-4 space-y-2">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-md"
                >
                  {notification}
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
