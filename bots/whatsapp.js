const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const P = require("pino");
const config = require("../config");

let sock;
let isConnected = false;

async function startWhatsApp(sendToTelegram) {
  const { state, saveCreds } = await useMultiFileAuthState("wa-session");

  sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" })
  });

  sock.ev.on("creds.update", saveCreds);

  // 🔑 DEMANDE DU CODE DE LIAISON
  if (!state.creds.registered) {
    const code = await sock.requestPairingCode(
      config.owner.whatsappNumber
    );

    if (sendToTelegram) {
      sendToTelegram(
        `📲 *Code de liaison WhatsApp*\n\n` +
        `👉 *${code}*\n\n` +
        `WhatsApp → Appareils liés → Lier avec un numéro`
      );
    }
  }

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
      isConnected = true;
      console.log("✅ WhatsApp connecté");
    }

    if (connection === "close") {
      isConnected = false;
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        startWhatsApp(sendToTelegram);
      }
    }
  });

  return sock;
}

function getStatus() {
  return isConnected ? "🟢 Connecté" : "🔴 Déconnecté";
}

module.exports = { startWhatsApp, getStatus };
