'use client';
import React, { useEffect, useState } from "react";
import { database } from "../../../lib/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/app/components/sidebarAdmin";
import Header from "@/app/components/headerAdmin";

interface Ticket {
  id: string;
  INCIDENT: string;
  SUMMARY: string;
  STATUS: string;
}

const TicketAdmin: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk input pencarian
  const searchParams = useSearchParams(); // Get query string
  const statusFilter = searchParams.get("status")?.toLowerCase();

  useEffect(() => {
    const ticketsRef = ref(database, "tickets");

    onValue(ticketsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ticketsArray: Ticket[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        // Filter tickets based on status
        const filteredTickets = statusFilter
          ? ticketsArray.filter(
              (ticket) => ticket.STATUS.toLowerCase() === statusFilter
            )
          : ticketsArray;

        setTickets(filteredTickets);
      }
    });
  }, [statusFilter]);

  // Filter tickets berdasarkan input pencarian
  const filteredTickets = tickets.filter((ticket) =>
    ticket.INCIDENT.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" min-h-screen bg-gray-100 pl-72 pr-8">
      <div className="mt-20">
        {/* Sidebar */}
        <Sidebar />
      </div>

      {/* Header */}
      <div className="pt-6">
        <Header />
      </div>

      <div className="flex justify-between">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Ticket Status</h1>
          {statusFilter && (
            <p className="text-gray-600">Filtered by: {statusFilter}</p>
          )}
        </header>

        {/* Input Pencarian */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Incident..."
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update state pencarian
          />
        </div>
      </div>

      <div
        className="bg-white rounded-lg shadow-md overflow-auto border border-gray-300"
        style={{ maxHeight: "600px" }}
      >
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100 border-b" style={{ position: "sticky", top: 0, zIndex: 10 }}>
              <th className="py-3 px-4 text-gray-600">No</th>
              <th className="py-3 px-4 text-gray-600">Incident</th>
              <th className="py-3 px-4 text-gray-600">Summary</th>
              <th className="py-3 px-4 text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket, index) => (
              <tr
                key={ticket.id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                <td className="py-3 px-4 text-gray-700">{ticket.INCIDENT}</td>
                <td className="py-3 px-4 text-gray-700">{ticket.SUMMARY}</td>
                <td className="py-3 px-4 text-gray-700">{ticket.STATUS}</td>
              </tr>
            ))}
            {filteredTickets.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="py-3 px-4 text-gray-600 text-center"
                >
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketAdmin;
