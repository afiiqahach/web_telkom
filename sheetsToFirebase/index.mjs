import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import cron from 'node-cron';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAsztSOEvQF7lWFa1h0gohWwSzMH1sCOcg",
  authDomain: "http://arina-151102.firebaseapp.com",
  databaseURL: "https://arina-151102-default-rtdb.firebaseio.com",
  projectId: "arina-151102",
  storageBucket: "http://arina-151102.appspot.com",
  messagingSenderId: "431314267144",
  appId: "1:431314267144:web:159f8cb8c67c4a1cfef5bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Google Sheets Config
const API_KEY = "AIzaSyAmcpzSyIeR5AEwKbswMOGWyQtosHuW_pw";
const SPREADSHEET_ID = "1JepaIEQq8MR-mR4lEdn-4bJLTNV6u6gcKbxOI7NCHLk";
const RANGE = "notif!A2:BW"; // Ganti dengan range data di spreadsheet Anda

// Fungsi untuk Mengambil Data dari Google Sheets
async function fetchSheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const rows = response.data.values;
    if (rows.length) {
      const headers = rows[0];
      const data = rows.slice(1).map(row => {
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || null;
        });
        return obj;
      });
      return data;
    } else {
      console.log('No data found in sheet.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching sheet data:', error.message);
    return [];
  }
}

// Fungsi untuk membersihkan key yang tidak valid
function sanitizeKey(key, index) {
  if (!key) return `key_${index}`; // Ganti key kosong dengan nama default
  return key.replace(/[.#$/\[\]]/g, "_"); // Ganti karakter ilegal dengan "_"
}

// Fungsi untuk menyinkronkan data ke Firebase
async function syncToFirebase() {
  const data = await fetchSheetData();
  if (data.length) {
    // Proses sanitasi key
    const sanitizedData = data.map((row, rowIndex) => {
      const sanitizedRow = {};
      Object.keys(row).forEach((key, columnIndex) => {
        const sanitizedKey = sanitizeKey(key, `${rowIndex}-${columnIndex}`); // Kombinasikan index untuk key default jika key kosong
        sanitizedRow[sanitizedKey] = row[key];
      });
      return sanitizedRow;
    });

    // Menyimpan data yang sudah disanitasi ke Firebase
    const dbRef = ref(database, 'googleSheetData');
    await set(dbRef, sanitizedData);
    console.log('Data synced to Firebase successfully!');
  } else {
    console.log('No data to sync.');
  }
}

// Jadwalkan Sinkronisasi setiap 5 menit
cron.schedule('*/1 * * * *', () => {
  console.log('Running scheduled sync...');
  syncToFirebase();
});

console.log("Scheduler started. Syncing every 1 minutes...");