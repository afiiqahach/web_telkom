import axios from 'axios';
import admin from 'firebase-admin';
import cron from 'node-cron';

// Konfigurasi Firebase
import serviceAccount from './serviceAccount.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arina-151102-default-rtdb.firebaseio.com/"
});

const database = admin.database();

// Google Sheets API Config
const API_KEY = "AIzaSyAmcpzSyIeR5AEwKbswMOGWyQtosHuW_pw"; // Ganti dengan API Key Anda
const SPREADSHEET_ID = "1JepaIEQq8MR-mR4lEdn-4bJLTNV6u6gcKbxOI7NCHLk"; // Ganti dengan Spreadsheet ID Anda
const RANGE = "notif!A:BY"; // Ganti dengan range yang sesuai

// Fungsi untuk membersihkan key
function sanitizeKey(key) {
  if (!key) return 'unknown_key'; // Ganti key kosong dengan nama default
  return key.replace(/[.#$/[\]]/g, '_'); // Ganti karakter ilegal dengan "_"
}

// Fungsi untuk mengambil data dari Google Sheets
async function fetchSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const rows = response.data.values;

    if (rows.length) {
      const headers = rows[0].map(header => sanitizeKey(header.trim().replace(/\s+/g, '_'))); // Format dan sanitasi header
      const data = rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          // Gunakan nilai kosong jika kolom kosong
          obj[header] = row[index] !== undefined ? row[index] : null;
        });
        return obj;
      });
      
      // Pastikan kolom diurutkan sesuai urutan header yang telah diformat
      const sortedData = data.map(row => {
        const sortedRow = {};
        headers.forEach(header => {
          sortedRow[header] = row[header]; // Urutkan kolom sesuai header
        });
        return sortedRow;
      });

      return sortedData;
    } else {
      console.log('No data found in Google Sheets.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching sheet data:', error.message);
    return [];
  }
}

// Fungsi untuk menyimpan data ke Firebase
async function syncToFirebase() {
  const data = await fetchSheetData();

  if (data.length) {
    const formattedData = {};
    data.forEach((row, index) => {
      formattedData[index] = row; // Simpan setiap baris dengan indeks sebagai key
    });

    const dbRef = database.ref('tickets');
    try {
      await dbRef.set(formattedData); // Simpan data ke Firebase
      console.log('Data successfully synced to Firebase.');
    } catch (error) {
      console.error('Error syncing data to Firebase:', error.message);
    }
  } else {
    console.log('No data to sync.');
  }
}

// Menjadwalkan sinkronisasi otomatis setiap 1 menit
cron.schedule('*/1 * * * *', () => {
  console.log('Running scheduled sync...');
  syncToFirebase();
});

// Jalankan sinkronisasi pertama kali saat aplikasi dimulai
syncToFirebase();
