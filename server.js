const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN manquant");
  process.exit(1);
}

// 🔥 BOT TELEGRAM (LE PLUS IMPORTANT)
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "✅ NOVARK BOT EST EN LIGNE");
});

bot.on("polling_error", (err) => {
  console.error("Polling error:", err.message);
});

// 🌐 PANEL SIMPLE
app.get("/", (req, res) => {
  res.send("🚀 NOVARK PANEL ACTIF");
});

app.listen(PORT, () => {
  console.log("🌐 Serveur lancé sur le port", PORT);
  console.log("🤖 Bot Telegram connecté");
});
