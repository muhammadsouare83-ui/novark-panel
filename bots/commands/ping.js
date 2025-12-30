module.exports = {
  name: "ping",
  execute(bot, msg) {
    bot.sendMessage(
      msg.chat.id,
      "🏓 *Pong !*\n\n" +
      "Le bot est en ligne et fonctionne normalement.\n" +
      "Temps de réponse : excellent ✅",
      { parse_mode: "Markdown" }
    );
  }
};
