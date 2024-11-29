'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import Sidebar from '../app/components/sidebar';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { useRouter } from 'next/navigation';
import BarChart from './components/barChart';

const Dashboard = () => {
  const [user, setUser] = useState<{ displayName: string | null; email: string | null } | null>(null);
  const router = useRouter();

  useEffect(() => {
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

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex mt-20 bg-gray-100">
      <Sidebar />
      <div className="flex-1 ms-64 bg-gray-50">
        <Header />
        <div className="p-12">
          {/* Welcome Section */}
          <div className="bg-white shadow-lg rounded-lg p-8 flex items-center justify-between transition duration-300">
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
            </div>
            <div className="flex-shrink-0">
              <img
                src="/img/arina.png"
                alt="ARINA Bot"
                className="h-72 transition duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Grafik Section */}
          <div className="bg-white shadow-lg rounded-lg p-8 mt-12 transition duration-300">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#104C98]">Incoming Data</h2>
            <BarChart />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
