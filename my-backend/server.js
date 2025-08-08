import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let lostCount = 0;

// Endpoint to log a lost mouse
app.post("/lost", (req, res) => {
  lostCount++;
  res.json({ totalLost: lostCount });
});

// Endpoint to get total lost count
app.get("/lost", (req, res) => {
  res.json({ totalLost: lostCount });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
