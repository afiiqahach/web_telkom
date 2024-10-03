"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faInbox, faList, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [saldoOpen, setSaldoOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const router = useRouter();

  const navigateToDashboard = () => {
    router.push('/')
  }

  return (
    <div className='fixed py-1'>
      <div className="justify-start flex bg-white py-4 px-8">
        <img src="img/logokecil.png" alt="bot" />
        <button className="text-2xl font-bold justify-start ps-4"
        onClick={navigateToDashboard}>ARINA</button>
      </div>
      <div className=" w-72 min-h-screen bg-[#EE2E24] text-white p-4">
      {/* Sidebar items */}
        <div className="mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer">Assets & Area</div>
        <div className="mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer">Person Service</div>
        <div className="mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer">Scheduling</div>

        {/* Incident Ticket with dropdown */}
        <div className="flex items-center mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer" onClick={() => setIncidentOpen(!incidentOpen)}>
          <span>Incident Ticket</span>
          <FontAwesomeIcon icon={incidentOpen ? faChevronDown : faChevronRight} className="ml-2" />
        </div>

      {incidentOpen && (
        <div className="ml-2">
          {/* Saldo Ticket */}
          <div className="flex items-center mb-4 p-2 hover:bg-red-500 rounded-md" onClick={() => setSaldoOpen(!saldoOpen)}>
            <button>Saldo Ticket</button>
            <FontAwesomeIcon icon={saldoOpen ? faChevronDown : faChevronRight} className="ml-2" />
          </div>

          {saldoOpen && (
            <div className="ml-2 flex flex-col items-start"> {/* Tambahkan flex container */}
              <button className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Draft
              </button>
              <button className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Loker
              </button>
              <button className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Pribadi
              </button>
              <button className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Ticket Imbas Gamas
              </button>
              <button className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Proactive
              </button>
            </div>
          )}


          {/* Request */}
          <div className="flex items-center mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer" onClick={() => setRequestOpen(!requestOpen)}>
            <span>Request</span>
            <FontAwesomeIcon icon={requestOpen ? faChevronDown : faChevronRight} className="ml-2" />
          </div>

          {requestOpen && (
            <div className="ml-4">
              <button className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faList} className="mr-2" /> All Ticket List
              </button>
              <button className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Closed Ticket List
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer">Work Order</div>
      <div className="mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer">SQM</div>
    </div>
    </div>
  );
};

export default Sidebar;
