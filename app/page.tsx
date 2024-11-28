"use client";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig.js'; // Pastikan ini mengarah ke konfigurasi Firebase Anda
import Sidebar from '../app/components/sidebar';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [user, setUser] = useState<{ displayName: string | null, email: string | null } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fungsi untuk memantau status autentikasi pengguna
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
        });
      } else {
        router.push('/login');
      }
    });
    
    // Membersihkan listener saat komponen unmount
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex mt-20">
      <Sidebar />
      <div className="flex-1 ms-64 bg-gray-50">
        <Header />
        <div className="p-12">
          <div className="bg-white shadow-md rounded-lg p-8 flex items-center justify-between">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold text-[#104C98] mb-4">
                Welcome to ARINA Dashboard
              </h1>

              <p className="text-lg text-gray-700">
                {user ? (
                  <>
                    Hello, <span className="font-semibold">{user.displayName || user.email}</span>!
                    <br />
                    Manage your assets and services efficiently.
                  </>
                ) : (
                  'Manage your assets and services efficiently.'
                )}
              </p>
              <button className="mt-6 px-4 py-2 bg-[#104C98] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                Get Started
              </button>
            </div>
            <div className="flex-shrink-0">
              <img src="/img/arina.png" alt="ARINA Bot" className=" h-72" />
            </div>
          </div>

          {/* Section tambahan untuk dashboard */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
              <p className="text-gray-600">
                Track your recent activities and updates in the system.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4">Asset Overview</h2>
              <p className="text-gray-600">
                View the current status and management of your assets.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4">Service Requests</h2>
              <p className="text-gray-600">
                Manage and track all your service requests in one place.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
