// import express from 'express'; // Mengimpor express dengan benar
// import googleSheets from '../../lib/googleSheets.mjs'; // Mengimpor googleSheets

// const app = express(); // Membuat instance express

// app.get('/sync', async (req, res) => {
//   try {
//     await googleSheets.syncSheetsToFirebase();  // Mengakses fungsi melalui objek ekspor default
//     res.send('Data berhasil disinkronisasi!');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Gagal mensinkronisasi data.');
//   }
// });

// app.listen(3001, () => console.log('Backend berjalan di http://localhost:3001'));

// import express from 'express';
// import { db } from '../../lib/configFirebase.mjs'; // Pastikan ini mengarah ke file konfigurasi Firebase

// const app = express();

// app.get('/api/firebase-data', async (req, res) => {
//     try {
//         const ref = db.ref('sheetData'); // Path data di Firebase
//         const snapshot = await ref.once('value');
//         const data = snapshot.val(); // Ambil data dari Firebase

//         console.log('Data fetched from Firebase:', data); // Log untuk debug
//         res.json(data); // Kirim data ke frontend
//     } catch (error) {
//         console.error('Error fetching data from Firebase:', error); // Log jika ada error
//         res.status(500).send('Error fetching data');
//     }
// });

// // Jalankan server jika belum ada
// app.listen(3001, () => {
//     console.log('Server is running on http://localhost:3000');
// });


// Install dependencies first
// npm install express firebase-admin

import express from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';
// import path from 'path'; // Untuk menangani path file kredensial
// import * as fs from 'fs';
import serviceAccount from './credentialsFirebase.json' assert { type: "json" };

// Inisialisasi aplikasi Express
const app = express();
const port = 5000;

// Menambahkan CORS untuk semua request
app.use(cors());

// Impor file JSON secara benar menggunakan `import`
// import serviceAccount from path.resolve('path/to/your/serviceAccountKey.json');

// Verifikasi serviceAccount di console
console.log(serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://arina-151102-default-rtdb.firebaseio.com',
  });

// Mengakses Firestore Firebase
const db = admin.firestore();

// API untuk mengambil data dari Firestore
app.get('/api/data', async (req, res) => {
  try {
    const ticketsRef = db.collection('tickets');
    const snapshot = await ticketsRef.get();
    const tickets = [];

    snapshot.forEach((doc) => {
      tickets.push(doc.data());
    });

    res.json(tickets);
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
    res.status(500).send('Error fetching data');
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
