const { PresenceUpdateStatus, ActivityType } = require("discord.js");

async function monitor(client, url) {
  fetch("https://mcapi.us/server/status?ip=server.statdk.com")
    .then((res) => res.json())
    .then((body) => {
      console.log(body);
      if (body.online == false) {
        client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
        client.user.setActivity("the server die", {
          type: ActivityType.Watching,
        });
      } else if (body.players.now == 0) {
        client.user.setStatus(PresenceUpdateStatus.Idle);
        client.user.setActivity("No Players Online", {
          type: ActivityType.Custom,
        });
      } else {
        client.user.setStatus(PresenceUpdateStatus.Online);
        client.user.setActivity(
          `${body.players.now} of ${body.players.max} Online`
        );
      }

      let nowLess = Date.now() / 1000;
      let timeout = Number(body.last_updated) + 300000 - nowLess;

      console.log(`Successful monitor, waiting ${Math.max(0, timeout)} ms`);

      setTimeout(() => {
        monitor(client, url);
      }, Math.max(0, timeout)); // Either a timer of zero or 5m after data expires, whichever is greater
    })
    .catch((err) => {
      client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
      client.user.setActivity("Unable to connect to MCAPI.US");

      console.error(err);

      setTimeout(() => {
        monitor(client, url);
      }, 60000); // 1 Minute Timeout
    });
}

module.exports = monitor;
