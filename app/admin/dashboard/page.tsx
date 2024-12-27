'use client';
import React, { useEffect, useState } from "react";
import { database } from "../../../lib/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useRouter } from "next/navigation";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Ticket {
  id: string;
  INCIDENT: string;
  STATUS: string;
  OWNER_GROUP: string;
}

const Dashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusCounts, setStatusCounts] = useState({
    backend: 0,
    analysis: 0,
  });
  const [ownerGroupCounts, setOwnerGroupCounts] = useState<Record<string, number>>({});
  const router = useRouter();

  const allDistricts = ["District A", "District B", "District C", "District D", "District E"]; // Default districts

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

        // Count tickets by status
        const backendCount = ticketsArray.filter(
          (ticket) => ticket.STATUS.toLowerCase() === "backend"
        ).length;
        const analysisCount = ticketsArray.filter(
          (ticket) => ticket.STATUS.toLowerCase() === "analysis"
        ).length;

        setStatusCounts({
          backend: backendCount,
          analysis: analysisCount,
        });

        // Count tickets by OWNER_GROUP
        const groupCounts: Record<string, number> = {};
        ticketsArray.forEach((ticket) => {
          const group = ticket.OWNER_GROUP || "Unknown";
          groupCounts[group] = (groupCounts[group] || 0) + 1;
        });

        // Ensure all districts are present
        allDistricts.forEach((district) => {
          if (!groupCounts[district]) {
            groupCounts[district] = 0;
          }
        });

        setOwnerGroupCounts(groupCounts);
      }
    });
  }, []);

  // Prepare data for bar chart
  const ownerGroups = Object.keys(ownerGroupCounts);
  const ticketCounts = Object.values(ownerGroupCounts);

  const chartData = {
    labels: ownerGroups,
    datasets: [
      {
        label: "Tickets per Owner Group",
        data: ticketCounts,
        backgroundColor: [
          "#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Pastikan "as const" digunakan di sini
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Tickets by Owner Group",
        font: {
          size: 16,
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 2.5,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
        grid: {
          color: "#e0e0e0",
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="min-h-screen pl-72 pr-6 bg-gray-100">
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </header>

        {/* Kotak Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className="flex items-center bg-blue-100 p-6 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push("/admin/status?status=backend")}
          >
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-800">Backend</h2>
              <p className="text-4xl font-bold text-blue-600">
                {statusCounts.backend}
              </p>
            </div>
            <div className="text-blue-500 text-5xl">🖥️</div>
          </div>
          <div
            className="flex items-center bg-green-100 p-6 rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push("/admin/status?status=analysis")}
          >
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-800">Analysis</h2>
              <p className="text-4xl font-bold text-green-600">
                {statusCounts.analysis}
              </p>
            </div>
            <div className="text-green-500 text-5xl">📊</div>
          </div>
        </div>

        {/* Diagram Batang */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Tickets by Owner Group
          </h2>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Daftar Tiket */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Tickets</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-gray-600">No</th>
                <th className="py-3 px-4 text-gray-600">Incident</th>
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
                  <td className="py-3 px-4 text-gray-700">{ticket.INCIDENT}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        ticket.STATUS.toLowerCase() === "backend"
                          ? "bg-blue-100 text-blue-600"
                          : ticket.STATUS.toLowerCase() === "analysis"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {ticket.STATUS.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4">
            <button
              className="text-blue-600 font-medium hover:underline"
              onClick={() => router.push("/admin/ticketAdmin")}
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
