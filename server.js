const express = require("express")
const app = express()

const BOT_TOKEN = process.env.BOT_TOKEN
const OWNER_ID = process.env.OWNER_ID
const DEV_NAME = process.env.DEV_NAME || "NOVARK"
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  if (!BOT_TOKEN) {
    return res.json({ error: "TOKEN manquant" })
  }

  res.send(`
    <h1>🚀 NOVARK BOT PANEL</h1>
    <p>✅ Serveur actif</p>
    <p>👤 Dev : ${DEV_NAME}</p>
    <button onclick="fetch('/start').then(r=>r.text()).then(alert)">
      Démarrer le bot
    </button>
  `)
})

app.get("/start", (req, res) => {
  if (!BOT_TOKEN) {
    return res.send("❌ BOT_TOKEN manquant")
  }

  res.send("✅ Bot démarré (token détecté)")
})

app.listen(PORT, () => {
  console.log("Panel lancé sur le port", PORT)
  console.log("BOT_TOKEN =", BOT_TOKEN ? "OK" : "MANQUANT")
})
