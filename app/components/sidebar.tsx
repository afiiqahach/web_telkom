"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faInbox,
  faList,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [saldoOpen, setSaldoOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/");
  };

  const navigateToTicket = () => {
    router.push("/ticket");
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-[#104C98] text-white shadow-lg">
      <div className="flex items-center justify-start p-4 bg-white shadow-sm">
        <img src="img/logokecil.png" alt="Telkom" className="h-10" />
        <button
          className="text-2xl font-bold ps-4 text-[#104C98] hover:text-black"
          onClick={navigateToDashboard}
        >
          ARINA
        </button>
      </div>
      <div className="p-4">
        {/* Sidebar items */}
        <div
          className="mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
          onClick={navigateToTicket}
        >
          Ticket
        </div>

        {/* Incident Ticket with dropdown */}
        <div
          className="flex items-center mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
          onClick={() => setIncidentOpen(!incidentOpen)}
        >
          <span>Incident Ticket</span>
          <FontAwesomeIcon
            icon={incidentOpen ? faChevronDown : faChevronRight}
            className="ml-2"
          />
        </div>

        {incidentOpen && (
          <div className="ml-2">
            {/* Saldo Ticket */}
            <div
              className="flex items-center mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
              onClick={() => setSaldoOpen(!saldoOpen)}
            >
              <span>Saldo Ticket</span>
              <FontAwesomeIcon
                icon={saldoOpen ? faChevronDown : faChevronRight}
                className="ml-2"
              />
            </div>

            {saldoOpen && (
              <div className="ml-4 flex flex-col items-start">
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Draft
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Loker
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Pribadi
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Ticket Imbas Gamas
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox Ticket Proactive
                </button>
              </div>
            )}

            {/* Request */}
            <div
              className="flex items-center mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
              onClick={() => setRequestOpen(!requestOpen)}
            >
              <span>Request</span>
              <FontAwesomeIcon
                icon={requestOpen ? faChevronDown : faChevronRight}
                className="ml-2"
              />
            </div>

            {requestOpen && (
              <div className="ml-4">
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faList} className="mr-2" /> All Ticket List
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
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
