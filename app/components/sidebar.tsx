"use client";

import { useState, useEffect } from "react";
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
  const [isReady, setIsReady] = useState(true); // Mengatur komponen siap sejak awal

  const router = useRouter();

  useEffect(() => {
    setIsReady(true);
  }, []);

  // const navigateToDashboard = () => {
  //   router.push("/");
  // };

  const navigateToTicket = () => {
    router.push("/ticket");
  };

  return (
    <div className="fixed left-0 w-64 h-full bg-[#104C98] text-white shadow-lg">
      {/* <div className="flex items-center justify-start p-4 bg-white shadow-sm">
        <img src="img/logokecil.png" alt="Telkom" className="h-10" />
        <button
          className="text-2xl font-bold ps-4 text-[#104C98] hover:text-black"
          onClick={navigateToDashboard}
        >
          ARINA
        </button>
      </div> */}
      <div className="p-4">
        {/* Sidebar items */}
        <div
          className="mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
          onClick={navigateToTicket}
        >
          Ticket
        </div>

        {/* Incident Ticket with dropdown */}
        {isReady && (
          <div
            className="flex items-center mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
            onClick={() => setIncidentOpen(!incidentOpen)}
            style={{ width: "100%", height: "40px" }}  // Fixed width and height
          >
            <span>Incident Ticket</span>
            <div style={{ width: "14px", height: "24px", display: "inline-block", marginLeft: "10px" }}>
              <FontAwesomeIcon
                icon={incidentOpen ? faChevronDown : faChevronRight}
                style={{
                  fontSize: "14px",
                  width: "100%",
                  // height: "100%",
                  // lineHeight: "14px",
                }} // Set size explicitly
              />
            </div>
          </div>
        )}

        {incidentOpen && (
          <div className="ml-2">
            {/* Saldo Ticket */}
            <div
              className="flex items-center mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
              onClick={() => setSaldoOpen(!saldoOpen)}
              style={{ width: "100%", height: "40px" }}  // Fixed width and height
            >
              <span>Saldo Ticket</span>
              <div style={{ width: "14px", height: "14px", display: "inline-block", marginLeft: "10px" }}>
                <FontAwesomeIcon
                  icon={saldoOpen ? faChevronDown : faChevronRight}
                  style={{
                    fontSize: "1px",
                    width: "100%",
                    height: "100%",
                    lineHeight: "14px",
                  }} // Set size explicitly
                />
              </div>
            </div>

            {saldoOpen && (
              <div className=" ml-1 flex flex-col items-start">
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" style={{ fontSize: "14px" }} />
                  Inbox Ticket Draft
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" style={{ fontSize: "14px" }} />
                  Inbox Ticket Loker
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" style={{ fontSize: "14px" }} />
                  Inbox Ticket Pribadi
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" style={{ fontSize: "14px" }} />
                  Ticket Imbas Gamas
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faInbox} className="mr-2" style={{ fontSize: "14px" }} />
                  Inbox Ticket Proactive
                </button>
              </div>
            )}

            {/* Request */}
            <div
              className="flex items-center mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
              onClick={() => setRequestOpen(!requestOpen)}
              style={{ width: "100%", height: "40px" }}  // Fixed width and height
            >
              <span>Request</span>
              <div style={{ width: "14px", height: "14px", display: "inline-block", marginLeft: "10px" }}>
                <FontAwesomeIcon
                  icon={requestOpen ? faChevronDown : faChevronRight}
                  style={{
                    fontSize: "14px",
                    width: "100%",
                    height: "100%",
                    lineHeight: "14px",
                  }} // Set size explicitly
                />
              </div>
            </div>

            {requestOpen && (
              <div className="ml-4">
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon icon={faList} className="mr-2" style={{ fontSize: "14px" }} />
                  All Ticket List
                </button>
                <button className="mb-4 p-2 hover:bg-[#083d6b] rounded-md">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mr-2"
                    style={{ fontSize: "14px" }}
                  />
                  Closed Ticket List
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
