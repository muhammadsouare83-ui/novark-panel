const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// ===== ROUTE TEST =====
app.get("/", (req, res) => {
  res.send("✅ NOVARK PANEL ACTIF");
});

let bot = null;

// ===== DEMARRER BOT TELEGRAM =====
app.post("/start-bot", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "TOKEN manquant" });
  }

  try {
    bot = new TelegramBot(token, { polling: true });

    bot.on("message", (msg) => {
      bot.sendMessage(msg.chat.id, "🤖 NOVARK BOT actif !");
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erreur bot Telegram" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Panel NOVARK lancé sur le port ${PORT}`);
});
