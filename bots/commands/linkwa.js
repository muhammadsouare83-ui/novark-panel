const { startWhatsApp } = require("../whatsapp");
const config = require("../../config");

module.exports = {
  name: "linkwa",
  async execute(bot, msg) {
    if (msg.from.id !== config.owner.telegramId) {
      return bot.sendMessage(msg.chat.id, "⛔ Accès refusé");
    }

    await startWhatsApp((text) => {
      bot.sendMessage(msg.chat.id, text, { parse_mode: "Markdown" });
    });

    bot.sendMessage(
      msg.chat.id,
      "⏳ Génération du code de liaison WhatsApp..."
    );
  }
};
