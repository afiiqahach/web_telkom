import React, { useEffect, useState } from "react";
import { database } from "../../../lib/firebaseConfig";
import { ref, onValue } from "firebase/database";

interface Ticket {
    id: string;
    title: string;
    status: string;
  }
  
  const Dashboard: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [statusCounts, setStatusCounts] = useState({
      backend: 0,
      analysis: 0,
    });
    useEffect(() => {
        const ticketsRef = ref(database, "tickets");
    
        onValue(ticketsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const ticketsArray: Ticket[] = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
    
            setTickets(ticketsArray);
    
            const backendCount = ticketsArray.filter(
              (ticket) => ticket.status === "backend"
            ).length;
            const analysisCount = ticketsArray.filter(
              (ticket) => ticket.status === "analysis"
            ).length;
    
            setStatusCounts({
              backend: backendCount,
              analysis: analysisCount,
            });
          }
        });
      }, []);
    
      return (
        <div className="min-h-screen pl-72 pr-6 bg-gray-100">
    
          {/* Main Content */}
          <main className="flex-1 p-6">
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </header>
    
            {/* Kotak Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center bg-blue-100 p-6 rounded-lg shadow-md">
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-800">Backend</h2>
                  <p className="text-4xl font-bold text-blue-600">
                    {statusCounts.backend}
                  </p>
                </div>
                <div className="text-blue-500 text-5xl">🖥️</div>
              </div>
              <div className="flex items-center bg-green-100 p-6 rounded-lg shadow-md">
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-800">Analysis</h2>
                  <p className="text-4xl font-bold text-green-600">
                    {statusCounts.analysis}
                  </p>
                </div>
                <div className="text-green-500 text-5xl">📊</div>
              </div>
            </div>
    
            {/* Daftar Tiket */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Tickets</h2>
              <table className="table-auto w-full text-left">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 text-gray-600">No</th>
                    <th className="py-3 px-4 text-gray-600">Title</th>
                    <th className="py-3 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.slice(0, 5).map((ticket, index) => (
                    <tr
                      key={ticket.id}
                      className="border-b hover:bg-gray-50 transition duration-200"
                    >
                      <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                      <td className="py-3 px-4 text-gray-700">{ticket.title}</td>
                      <td className="py-3 px-4 text-gray-700">{ticket.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right mt-4">
                <button
                  className="text-blue-600 font-medium hover:underline"
                  onClick={() => (window.location.href = "/admin")}
                >
                  Show All
                </button>
              </div>
            </div>
          </main>
        </div>
      );
    };
    
    export default Dashboard;