'use client'

import { SearchIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";

// 1. Definisikan tipe untuk ticket
interface Ticket {
  INCIDENT: string;
  TTR_CUSTOMER?: string;
  SUMMARY: string;
  REPORTED_DATE?: string;
  OWNER_GROUP: string;
  OWNER?: string;
  CUSTOMER_SEGMENT: string;
  SERVICE_TYPE: string;
  WITEL: string;
  WORKZONE: string;
  STATUS?: string;
  STATUS_DATE?: string;
  TICKET_ID_GAMAS?: string;
  REPORTED_BY?: string;
  CONTACT_PHONE?: string;
  CONTACT_NAME?: string;
  CONTACT_EMAIL?: string;
  BOOKING_DATE?: string;
  DESCRIPTION_ASSIGNMENT?: string;
  REPORTED_PRIORITY?: string;
  SOURCE_TICKET?: string;
  SUBSIDIARY?: string;
  EXTERNAL_TICKET_ID?: string;
  CHANNEL?: string;
  CUSTOMER_TYPE?: string;
  CLOSED_BY?: string;
  CLOSED_REOPEN_BY?: string;
  CUSTOMER_ID: string;
  CUSTOMER_NAME: string;
  SERVICE_ID: string;
  SERVICE_NO: string;
  SLG?: string;
  TECHNOLOGY: string;
  LAPUL?: string;
  GAUL?: string;
  ONU_RX?: string;
  PENDING_REASON?: string;
  DATEMODIFIED?: string;
  INCIDENT_DOMAIN: string;
  REGION: string;
  SYMPTOM?: string;
  HIERARCHY_PATH?: string;
  SOLUTION?: string;
  DESCRIPTION_ACTUAL_SOLUTION?: string;
  KODE_PRODUK?: string;
  PERANGKAT?: string;
  TECHNICIAN?: string;
  DEVICE_NAME?: string;
  WORKLOG_SUMMARY?: string;
  CLASSIFICATION_FLAG?: string;
  REALM?: string;
  RELATED_TO_GAMAS?: string;
  TSC_RESULT?: string;
  SCC_RESULT?: string;
  TTR_AGENT?: string;
  TTR_MITRA?: string;
  TTR_NASIONAL?: string;
  TTR_PENDING?: string;
  TTR_REGION?: string;
  TTR_WITEL?: string;
  TTR_END_TO_END?: string;
  NOTE?: string;
  GUARANTE_STATUS?: string;
  RESOLVE_DATE?: string;
  SN_ONT?: string;
  TIPE_ONT?: string;
  MANUFACTURE_ONT?: string;
  IMPACTED_SITE?: string;
  CAUSE?: string;
  RESOLUTION?: string;
}

const TicketTable: React.FC = () => {
  // 2. Tambahkan tipe Ticket[] pada useState
  const [data, setData] = useState<Ticket[]>([]);

  useEffect(() => {
    //fetch ticket dari API
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data: Ticket[]) => setData(data)) // Pastikan tipe data yang dikembalikan sesuai
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="bg-white pl-12 shadow-lg rounded-lg mt-5">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 border rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
            </svg>
          </button>
          <div className="relative w-[440px]">
            <input
              type="text"
              className="border rounded-lg p-2 pl-10 pr-4"
              placeholder="Search..."
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
          
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">+ Add customer</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-max">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-4 text-left">INCIDENT</th>
              <th className="p-4 text-left">TTR CUSTOMER</th>
              <th className="p-4 text-left">SUMMARY</th>
              <th className="p-4 text-left">REPORTED DATE</th>
              <th className="p-4 text-left">OWNER GROUP</th>
              <th className="p-4 text-left">OWNER</th>
              <th className="p-4 text-left">CUSTOMER SEGMENT</th>
              <th className="p-4 text-left">SERVICE TYPE</th>
              <th className="p-4 text-left">WITEL</th>
              <th className="p-4 text-left">WORKZONE</th>
              <th className="p-4 text-left">STATUS</th>
              <th className="p-4 text-left">STATUS DATE</th>
              <th className="p-4 text-left">TICKET ID GAMAS</th>
              <th className="p-4 text-left">REPORTED BY</th>
              <th className="p-4 text-left">CONTACT PHONE</th>
              <th className="p-4 text-left">CONTACT NAME</th>
              <th className="p-4 text-left">CONTACT EMAIL</th>
              <th className="p-4 text-left">BOOKING DATE</th>
              <th className="p-4 text-left">DESCRIPTION ASSIGMENT</th>
              <th className="p-4 text-left">REPORTED PRIORITY</th>
              <th className="p-4 text-left">SOURCE TICKET</th>
              <th className="p-4 text-left">SUBSIDIARY</th>
              <th className="p-4 text-left">EXTERNAL TICKET ID</th>
              <th className="p-4 text-left">CHANNEL</th>
              <th className="p-4 text-left">CUSTOMER TYPE</th>
              <th className="p-4 text-left">CLOSED BY</th>
              <th className="p-4 text-left">CLOSED / REOPEN by</th>
              <th className="p-4 text-left">CUSTOMER ID</th>
              <th className="p-4 text-left">CUSTOMER NAME</th>
              <th className="p-4 text-left">SERVICE ID</th>
              <th className="p-4 text-left">SERVICE NO</th>
              <th className="p-4 text-left">SLG</th>
              <th className="p-4 text-left">TECHNOLOGY</th>
              <th className="p-4 text-left">LAPUL</th>
              <th className="p-4 text-left">GAUL</th>
              <th className="p-4 text-left">ONU RX</th>
              <th className="p-4 text-left">PENDING REASON</th>
              <th className="p-4 text-left">DATEMODIFIED</th>
              <th className="p-4 text-left">INCIDENT DOMAIN</th>
              <th className="p-4 text-left">REGION</th>
              <th className="p-4 text-left">SYMPTOM</th>
              <th className="p-4 text-left">HIERARCHY PATH</th>
              <th className="p-4 text-left">SOLUTION</th>
              <th className="p-4 text-left">DESCRIPTION ACTUAL SOLUTION</th>
              <th className="p-4 text-left">KODE PRODUK</th>
              <th className="p-4 text-left">PERANGKAT</th>
              <th className="p-4 text-left">TECHNICIAN</th>
              <th className="p-4 text-left">DEVICE NAME</th>
              <th className="p-4 text-left">WORKLOG SUMMARY</th>
              <th className="p-4 text-left">CLASSIFICATION FLAG</th>
              <th className="p-4 text-left">REALM</th>
              <th className="p-4 text-left">RELATED TO GAMAS</th>
              <th className="p-4 text-left">TSC RESULT</th>
              <th className="p-4 text-left">SCC RESULT</th>
              <th className="p-4 text-left">TTR AGENT</th>
              <th className="p-4 text-left">TTR MITRA</th>
              <th className="p-4 text-left">TTR NASIONAL</th>
              <th className="p-4 text-left">TTR PENDING</th>
              <th className="p-4 text-left">TTR REGION</th>
              <th className="p-4 text-left">TTR WITEL</th>
              <th className="p-4 text-left">TTR END TO END</th>
              <th className="p-4 text-left">NOTE</th>
              <th className="p-4 text-left">GUARANTE STATUS</th>
              <th className="p-4 text-left">RESOLVE DATE</th>
              <th className="p-4 text-left">SN ONT</th>
              <th className="p-4 text-left">TIPE ONT</th>
              <th className="p-4 text-left">MANUFACTURE ONT</th>
              <th className="p-4 text-left">IMPACTED SITE</th>
              <th className="p-4 text-left">CAUSE</th>
              <th className="p-4 text-left">RESOLUTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ticket, index) => (
              <tr key={index}>
                <td className="p-4">{ticket.INCIDENT}</td>
                <td className="p-4">{ticket.TTR_CUSTOMER}</td>
                <td className="p-4">{ticket.SUMMARY}</td>
                <td className="p-4">{ticket.REPORTED_DATE}</td>
                <td className="p-4">{ticket.OWNER_GROUP}</td>
                <td className="p-4">{ticket.OWNER}</td>
                <td className="p-4">{ticket.CUSTOMER_SEGMENT}</td>
                <td className="p-4">{ticket.SERVICE_TYPE}</td>
                <td className="p-4">{ticket.WITEL}</td>
                <td className="p-4">{ticket.WORKZONE}</td>
                <td className="p-4">{ticket.STATUS}</td>
                <td className="p-4">{ticket.STATUS_DATE}</td>
                <td className="p-4">{ticket.TICKET_ID_GAMAS}</td>
                <td className="p-4">{ticket.REPORTED_BY}</td>
                <td className="p-4">{ticket.CONTACT_PHONE}</td>
                <td className="p-4">{ticket.CONTACT_NAME}</td>
                <td className="p-4">{ticket.CONTACT_EMAIL}</td>
                <td className="p-4">{ticket.BOOKING_DATE}</td>
                <td className="p-4">{ticket.DESCRIPTION_ASSIGNMENT}</td>
                <td className="p-4">{ticket.REPORTED_PRIORITY}</td>
                <td className="p-4">{ticket.SOURCE_TICKET}</td>
                <td className="p-4">{ticket.SUBSIDIARY}</td>
                <td className="p-4">{ticket.EXTERNAL_TICKET_ID}</td>
                <td className="p-4">{ticket.CHANNEL}</td>
                <td className="p-4">{ticket.CUSTOMER_TYPE}</td>
                <td className="p-4">{ticket.CLOSED_BY}</td>
                <td className="p-4">{ticket.CLOSED_REOPEN_BY}</td>
                <td className="p-4">{ticket.CUSTOMER_ID}</td>
                <td className="p-4">{ticket.CUSTOMER_NAME}</td>
                <td className="p-4">{ticket.SERVICE_ID}</td>
                <td className="p-4">{ticket.SERVICE_NO}</td>
                <td className="p-4">{ticket.SLG}</td>
                <td className="p-4">{ticket.TECHNOLOGY}</td>
                <td className="p-4">{ticket.LAPUL}</td>
                <td className="p-4">{ticket.GAUL}</td>
                <td className="p-4">{ticket.ONU_RX}</td>
                <td className="p-4">{ticket.PENDING_REASON}</td>
                <td className="p-4">{ticket.DATEMODIFIED}</td>
                <td className="p-4">{ticket.INCIDENT_DOMAIN}</td>
                <td className="p-4">{ticket.REGION}</td>
                <td className="p-4">{ticket.SYMPTOM}</td>
                <td className="p-4">{ticket.HIERARCHY_PATH}</td>
                <td className="p-4">{ticket.SOLUTION}</td>
                <td className="p-4">{ticket.DESCRIPTION_ACTUAL_SOLUTION}</td>
                <td className="p-4">{ticket.KODE_PRODUK}</td>
                <td className="p-4">{ticket.PERANGKAT}</td>
                <td className="p-4">{ticket.TECHNICIAN}</td>
                <td className="p-4">{ticket.DEVICE_NAME}</td>
                <td className="p-4">{ticket.WORKLOG_SUMMARY}</td>
                <td className="p-4">{ticket.CLASSIFICATION_FLAG}</td>
                <td className="p-4">{ticket.REALM}</td>
                <td className="p-4">{ticket.RELATED_TO_GAMAS}</td>
                <td className="p-4">{ticket.TSC_RESULT}</td>
                <td className="p-4">{ticket.SCC_RESULT}</td>
                <td className="p-4">{ticket.TTR_AGENT}</td>
                <td className="p-4">{ticket.TTR_MITRA}</td>
                <td className="p-4">{ticket.TTR_NASIONAL}</td>
                <td className="p-4">{ticket.TTR_PENDING}</td>
                <td className="p-4">{ticket.TTR_REGION}</td>
                <td className="p-4">{ticket.TTR_WITEL}</td>
                <td className="p-4">{ticket.TTR_END_TO_END}</td>
                <td className="p-4">{ticket.NOTE}</td>
                <td className="p-4">{ticket.GUARANTE_STATUS}</td>
                <td className="p-4">{ticket.RESOLVE_DATE}</td>
                <td className="p-4">{ticket.SN_ONT}</td>
                <td className="p-4">{ticket.TIPE_ONT}</td>
                <td className="p-4">{ticket.MANUFACTURE_ONT}</td>
                <td className="p-4">{ticket.IMPACTED_SITE}</td>
                <td className="p-4">{ticket.CAUSE}</td>
                <td className="p-4">{ticket.RESOLUTION}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
