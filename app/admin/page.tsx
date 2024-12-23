'use client';

import React, { useEffect, useState } from 'react';
import { ref, onValue, remove } from 'firebase/database'; // Import from firebase/database
import { database } from '../../lib/firebaseConfig'; // Importing the initialized Firebase Realtime Database

type Ticket = {
  id: string;
  INCIDENT: string;
  TTR: string;
  CUSTOMER: string;
  SUMMARY: string;
  REPORTED_DATE: string;
  OWNER_GROUP: string;
  OWNER: string;
  CUSTOMER_SEGMENT: string;
  SERVICE_TYPE: string;
  WITEL: string;
  WORKZONE: string;
  STATUS: string;
  STATUS_DATE: string;
  TICKET_ID_GAMAS: string;
  REPORTED_BY: string;
  CONTACT_PHONE: string;
  CONTACT_NAME: string;
  CONTACT_EMAIL: string;
  BOOKING_DATE: string;
  DESCRIPTION_ASSIGNMENT: string;
  REPORTED_PRIORITY: string;
  SOURCE_TICKET: string;
  SUBSIDIARY: string;
  EXTERNAL_TICKET_ID: string;
  CHANNEL: string;
  CUSTOMER_TYPE: string;
  CLOSED_BY: string;
  CLOSED_REOPEN_BY: string;
  CUSTOMER_ID: string;
  CUSTOMER_NAME: string;
  SERVICE_ID: string;
  SERVICE_NO: string;
  SLG: string;
  TECHNOLOGY: string;
  LAPUL: string;
  GAUL: string;
  ONU_RX: string;
  PENDING_REASON: string;
  DATEMODIFIED: string;
  INCIDENT_DOMAIN: string;
  REGION: string;
  SYMPTOM: string;
  HIERARCHY_PATH: string;
  SOLUTION: string;
  DESCRIPTION_ACTUAL_SOLUTION: string;
  KODE_PRODUK: string;
  PERANGKAT: string;
  TECHNICIAN: string;
  DEVICE_NAME: string;
  WORKLOG_SUMMARY: string;
  CLASSIFICATION_FLAG: string;
  REALM: string;
  RELATED_TO_GAMAS: string;
  TSC_RESULT: string;
  SCC_RESULT: string;
  TTR_AGENT: string;
  TTR_MITRA: string;
  TTR_NASIONAL: string;
  TTR_PENDING: string;
  TTR_REGION: string;
  TTR_WITEL: string;
  TTR_END_TO_END: string;
  NOTE: string;
  GUARANTE_STATUS: string;
  RESOLVE_DATE: string;
  SN_ONT: string;
  TIPE_ONT: string;
  MANUFACTURE_ONT: string;
  IMPACTED_SITE: string;
  CAUSE: string;
  RESOLUTION: string;
  NOTES_ESKALASI: string;
  RK_INFORMATION: string;
};

const TicketEditPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const ticketsRef = ref(database, 'tickets'); // Using the correct reference for Realtime Database

    onValue(ticketsRef, (snapshot) => {
      const data = snapshot.val();
      const ticketsArray: Ticket[] = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setTickets(ticketsArray);
    });
  }, []);

  const handleEdit = (id: string) => {
    // Placeholder for edit functionality
    console.log(`Editing ticket with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    const ticketRef = ref(database, `tickets/${id}`);

    // Remove ticket from Firebase Realtime Database
    remove(ticketRef)
      .then(() => {
        console.log(`Ticket with ID: ${id} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting ticket with ID: ${id}`, error);
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Incident</th>
              <th className="border border-gray-300 px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-4 py-2">Summary</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.INCIDENT}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.CUSTOMER}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.SUMMARY}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.STATUS}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(ticket.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketEditPage;