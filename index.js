const { Client, Events, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const monitor = require("./src/monitor.js");

if (fs.existsSync(path.join(".", ".env"))) require("dotenv").config();

const config = {};
if (fs.existsSync(path.join(".", "data", "config.json")))
  config = JSON.parse(fs.readFileSync(path.join(".", "data", "config.json")));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
  monitor(client, "server.statdk.com");
});

try {
  client.login(process.env.token);
} catch (err) {
  console.err("Unable to log in! Do we have a token?\n", err);
  exit(1);
}
