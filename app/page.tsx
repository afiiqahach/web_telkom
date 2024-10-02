"use client"
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Pastikan ini mengarah ke konfigurasi Firebase Anda
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
    <div>
      <Sidebar />
      <div className="ms-64">
        <Header />
        <div className="flex">
          <div className="pt-32 justify-center gap-[60px] inline-flex">
            <div className="h-[520px] p-[60px] flex-col justify-start items-start gap-6 inline-flex">
              <div className="self-stretch text-black text-[40px] font-bold">
                Welcome to ARINA <br />Dashboard
              </div>
              <div className="self-stretch text-black">
                {user ? (
                  <>
                    Hello, {user.displayName || user.email}! {/* Tampilkan nama atau email pengguna */}
                    <br />
                    Manage your assets and services efficiently
                  </>
                ) : (
                  'Manage your assets and services efficiently'
                )}
              </div>
            </div>
            <div className="grow justify-start items-start pl-32 flex">
              <img src="img/bot.png" alt="bot" />
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
