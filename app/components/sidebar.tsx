"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faInbox, faList, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [saldoOpen, setSaldoOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <div className="w-64 h-screen bg-[#EE2E24] text-white p-4">
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
        <div className="ml-4">
          {/* Saldo Ticket */}
          <div className="flex items-center mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer" onClick={() => setSaldoOpen(!saldoOpen)}>
            <span>Saldo Ticket</span>
            <FontAwesomeIcon icon={saldoOpen ? faChevronDown : faChevronRight} className="ml-2" />
          </div>

          {saldoOpen && (
            <div className="ml-4">
              <div className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Draft
              </div>
              <div className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Loker
              </div>
              <div className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Pribadi
              </div>
              <div className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Ticket Imbas Gamas
              </div>
              <div className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Proactive
              </div>
            </div>
          )}

          {/* Request */}
          <div className="flex items-center mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer" onClick={() => setRequestOpen(!requestOpen)}>
            <span>Request</span>
            <FontAwesomeIcon icon={requestOpen ? faChevronDown : faChevronRight} className="ml-2" />
          </div>

          {requestOpen && (
            <div className="ml-4">
              <div className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faList} className="mr-2" /> All Ticket List
              </div>
              <div className="mb-4 p-2 hover:bg-red-500 rounded-md">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Closed Ticket List
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer">Work Order</div>
      <div className="mb-4 p-2 hover:bg-red-500 rounded-md cursor-pointer">SQM</div>
    </div>
  );
};

export default Sidebar;
