import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  //Chart,
  //ChartTypeRegistry,
} from 'chart.js';

// Register komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Definisikan tipe untuk konteks animasi
// type AnimationContext = {
//   chart: Chart<keyof ChartTypeRegistry>;
//   currentStep: number;
//   numSteps: number;
//   initial: boolean;
// };

const BarChart: React.FC = () => {
  // Data untuk grafik 12 bulan (Januari - Desember)
  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Incoming Data',
        data: [50, 75, 100, 80, 60, 30, 34, 60, 66, 20, 96, 10], // Data dummy untuk 12 bulan
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opsi konfigurasi chart dengan animasi
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // Agar grafik fleksibel dengan ukuran layar
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 10, // Ukuran font untuk legend lebih kecil
          },
        },
      },
      title: {
        display: true,
        text: 'Incoming Data',
        font: {
          size: 14, // Ukuran font untuk title lebih kecil
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10, // Ukuran font untuk label bulan lebih kecil
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10, // Ukuran font untuk label angka di sumbu Y lebih kecil
          },
        },
      },
    },
    // Menambahkan pengaturan animasi
    animation: {
      duration: 1500, // Durasi animasi dalam milidetik (1.5 detik)
      easing: 'easeInOutQuad', // Efek easing untuk transisi halus
     // onProgress: (context: AnimationContext) => {
        //console.log('Animation progress:', context.chart.currentStep / context.chart.numSteps);
      //},
      onComplete: () => {
        console.log('Animation complete!');
      },
    },
  };

  return (
    <div className="w-full h-[250px] md:h-[300px] lg:h-[350px] max-w-4xl mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;