'use client';

// import { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '@/lib/firebaseConfig';
import Sidebar from '@/app/components/sidebarAdmin';
import Header from '@/app/components/headerAdmin';
// import Footer from '@/app/components/footer';
// import { useRouter } from 'next/navigation';
import Dashboard from './dashboard/page';

const Ticket = () => {
    return (
        <div >
            <Sidebar/>
            <div className="my-20">
                <div>
                    <Header/>
                </div>
            </div>
            <div>
              <Dashboard/>
            </div>            
        </div>
    )
}

export default Ticket