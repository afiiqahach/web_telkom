import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ref, onValue } from "firebase/database";
import { database } from "../../lib/firebaseConfig"; // Sesuaikan path jika berbeda

// Tipe data untuk tiket di Firebase
type FirebaseTicket = {
  REPORTED_DATE: string;
};

// Register Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC = () => {
  // State untuk data chart, diisi dengan nilai awal 12 bulan (0)
  const [chartData, setChartData] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    // Referensi ke node "tickets" di Firebase
    const ticketRef = ref(database, "tickets");

    const unsubscribe = onValue(ticketRef, (snapshot) => {
      const ticketData = snapshot.val();
      console.log("Data dari Firebase:", ticketData);

      if (!ticketData) {
        console.warn("Data tidak ditemukan di Firebase.");
        setChartData(Array(12).fill(0)); // Reset jika tidak ada data
        return;
      }

      // Inisialisasi array untuk menghitung tiket per bulan
      const monthlyData: number[] = Array(12).fill(0);

      // Proses setiap tiket dalam objek ticketData
      (Object.values(ticketData) as FirebaseTicket[]).forEach((ticket) => {
        const reportedDate = ticket?.REPORTED_DATE; // Ambil REPORTED_DATE
        if (reportedDate) {
          const monthIndex = getMonthIndexFromDate(reportedDate); // Dapatkan indeks bulan
          if (monthIndex !== -1) {
            monthlyData[monthIndex] += 1; // Tambah jumlah tiket di bulan tersebut
          }
        }
      });

      console.log("Monthly data yang diproses:", monthlyData);
      setChartData(monthlyData); // Set state chartData
    });

    return () => unsubscribe(); // Hapus listener saat komponen unmount
  }, []);

 // Fungsi untuk mendapatkan indeks bulan dari tanggal
const getMonthIndexFromDate = (date: string): number => {
  try {
    const month = new Date(date).getMonth(); // Mendapatkan bulan: 0 (Jan) - 11 (Des)
    return month;
  } catch {
    console.error("Format tanggal tidak valid:", date);
    return -1; // Jika format salah, kembalikan -1
  }
};


  // Data untuk Bar Chart
  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Tickets per Month",
        data: chartData, // Data yang telah diolah
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Opsi untuk Chart.js
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 10 },
        },
      },
      title: {
        display: true,
        text: "Tickets Data by Month",
        font: { size: 14 },
      },
    },
    scales: {
      x: { ticks: { font: { size: 10 } } },
      y: { ticks: { font: { size: 10 } } },
    },
  };

  return (
    <div className="w-full h-[250px] md:h-[300px] lg:h-[350px] max-w-4xl mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
