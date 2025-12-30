const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.use(express.json());
app.use(express.static("public"));

app.get("/status", (req, res) => {
  res.json({ status: "ok", message: "Serveur actif ✅" });
});

app.post("/start-bot", async (req, res) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "Token manquant" });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const data = await response.json();

    if (data.ok) {
      res.json({ success: true, bot: data.result });
    } else {
      res.status(500).json({ error: "Bot non valide" });
    }
  } catch (e) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Panel NOVARK lancé sur le port", PORT)
);
