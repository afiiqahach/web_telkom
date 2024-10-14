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

  const navigateToTicket = () => {
    router.push('/ticket')
  }

  return (
    <div className='fixed py-1'>
      <div className="justify-start flex bg-white py-4 px-8">
        <img src="img/logokecil.png" alt="bot" />
        <button className="text-2xl font-bold justify-start ps-4"
        onClick={navigateToDashboard}>ARINA</button>
      </div>
      <div className="w-72 min-h-screen bg-[#EE2E24] text-white p-4 shadow-lg">
        {/* Sidebar items */}
        <div className="mb-4 p-3 hover:bg-red-600 rounded-md cursor-pointer transition-all duration-300"
        onClick={navigateToTicket}>
          Ticket
        </div>

        {/* Incident Ticket with dropdown */}
        <div 
          className="flex items-center mb-4 p-3 hover:bg-red-600 rounded-md cursor-pointer transition-all duration-300" 
          onClick={() => setIncidentOpen(!incidentOpen)}>
          <span>Incident Ticket</span>
          <FontAwesomeIcon icon={incidentOpen ? faChevronDown : faChevronRight} className="ml-2" />
        </div>

        {incidentOpen && (
          <div className="ml-2 transition-all duration-300">
            {/* Saldo Ticket */}
            <div 
              className="flex items-center mb-4 p-3 hover:bg-red-600 rounded-md cursor-pointer transition-all duration-300" 
              onClick={() => setSaldoOpen(!saldoOpen)}>
              <button>Saldo Ticket</button>
              <FontAwesomeIcon icon={saldoOpen ? faChevronDown : faChevronRight} className="ml-2" />
            </div>

            {saldoOpen && (
              <div className="ml-2 flex flex-col items-start transition-all duration-300">
                <button className="mb-4 p-3 hover:bg-red-600 rounded-md transition-colors duration-300">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Draft
                </button>
                <button className="mb-4 p-3 hover:bg-red-600 rounded-md transition-colors duration-300">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Loker
                </button>
                <button className="mb-4 p-3 hover:bg-red-600 rounded-md transition-colors duration-300">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Pribadi
                </button>
                <button className="mb-4 p-3 hover:bg-red-600 rounded-md transition-colors duration-300">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Ticket Imbas Gamas
                </button>
                <button className="mb-4 p-3 hover:bg-red-600 rounded-md transition-colors duration-300">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Proactive
                </button>
              </div>
            )}

            {/* Request */}
            <div 
              className="flex items-center mb-4 p-3 hover:bg-red-600 rounded-md cursor-pointer transition-all duration-300" 
              onClick={() => setRequestOpen(!requestOpen)}>
              <span>Request</span>
              <FontAwesomeIcon icon={requestOpen ? faChevronDown : faChevronRight} className="ml-2" />
            </div>

            {requestOpen && (
              <div className="ml-4 transition-all duration-300">
                <button className="mb-4 p-3 hover:bg-red-600 rounded-md transition-colors duration-300">
                  <FontAwesomeIcon icon={faList} className="mr-2" /> All Ticket List
                </button>
                <button className="mb-4 p-3 hover:bg-red-600 rounded-md transition-colors duration-300">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Closed Ticket List
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
