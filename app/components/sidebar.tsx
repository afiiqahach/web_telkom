'use client';
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [incidentOpen, setIncidentOpen] = useState(false);
  return (
    <div className="bg-red-600 text-white w-60 h-screen flex flex-col gap-2 py-5 px-5">
    <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Assets & Area</Link></div>
    <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Person Service</Link></div>
    <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Scheduling</Link></div>
    
    {/* Incident Ticket with dropdown */}
    <div className="p-2 hover:bg-red-300 rounded-md cursor-pointer" onClick={() => setIncidentOpen(!incidentOpen)}>
      Incident Ticket
    </div>
    {incidentOpen && (
      <div className="ml-4">
        <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Inbox Ticket Draft</Link></div>
        <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Inbox Ticket Loker</Link></div>
        <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Inbox Ticket Pribadi</Link></div>
        <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Inbox Ticket Imbas Gamas</Link></div>
        <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Inbox Ticket Proactive</Link></div>
        <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">All Ticket List</Link></div>
        <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Closed Ticket List</Link></div>
      </div>
    )}

    <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Work Order</Link></div>
    <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">SQM</Link></div>
  </div>
  );
};

export default Sidebar;
