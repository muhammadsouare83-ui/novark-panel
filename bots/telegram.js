const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");

let botInstance = null;

// Charger toutes les commandes
const commands = {};
const commandsPath = path.join(__dirname, "commands");

fs.readdirSync(commandsPath).forEach(file => {
  const command = require(`./commands/${file}`);
  commands[command.name] = command;
});

function startTelegramBot(token) {
  if (botInstance) return "⚠️ Bot déjà en cours";

  botInstance = new TelegramBot(token, { polling: true });

  botInstance.on("message", (msg) => {
    const text = msg.text || "";
    if (!text.startsWith("/")) return;

    const commandName = text.split(" ")[0].substring(1);

    if (commands[commandName]) {
      commands[commandName].execute(botInstance, msg);
    } else {
      botInstance.sendMessage(
        msg.chat.id,
        "❓ Commande inconnue. Tape /menu"
      );
    }
  });

  console.log("🤖 Bot Telegram NOVARK lancé avec commandes");
  return "✅ Bot Telegram démarré avec commandes";
}

module.exports = { startTelegramBot };
