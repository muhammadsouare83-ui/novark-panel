const { getStatus } = require("../whatsapp");
const config = require("../../config");

module.exports = {
  name: "statuswa",
  execute(bot, msg) {
    if (msg.from.id !== config.owner.telegramId) {
      return bot.sendMessage(msg.chat.id, "⛔ Accès refusé");
    }

    bot.sendMessage(msg.chat.id, `📡 Statut WhatsApp : ${getStatus()}`);
  }
};
