import express from "express";
import { database, ref, get } from "./firebase";

const app = express();
const PORT = 3000;

// Endpoint untuk mendapatkan data dari Firebase
app.get("/data", async (req, res) => {
  try {
    const dbRef = ref(database, "/googleSheetData");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.status(404).send("No data found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
