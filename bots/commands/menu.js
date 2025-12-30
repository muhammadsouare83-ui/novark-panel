module.exports = {
  name: "menu",
  execute(bot, msg) {
    bot.sendMessage(
      msg.chat.id,
      "📋 *MENU — NOVARK BOT*\n\n" +
      "🔹 /ping — Vérifier le bot\n" +
      "🔹 /menu — Afficher ce menu\n\n" +
      "_Bot stable, sécurisé et professionnel._",
      { parse_mode: "Markdown" }
    );
  }
};
