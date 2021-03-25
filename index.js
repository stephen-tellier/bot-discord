const Discord = require("discord.js");
const bot = new Discord.Client();
const request = require("request");
const cron = require('cron');

let url = "https://api.top-serveurs.net/v1/servers/HURZR2SCR6/players-ranking";

let options = { json: true };

//let scheduledMessage = new cron.CronJob('00 0-59 * * * *', () => {
//  // This runs every day at 10:30:00, you can do anything you want
//  let channel = yourGuild.channels.get('783377719106469900');
//  channel.send('You message');
//});
// You could also make a command to pause and resume the job

bot.on("ready", function () {
// When you want to start it, use:
//scheduledMessage.start()
});

bot.on("message", function (message) {
  if (message.content === "!topvote") {
    request(url, options, (error, res, body) => {
      if (error) {
        return console.log(error);
      }

      if (!error && res.statusCode === 200) {
        let votelist = "";
        let n = 1;
        body.players.forEach((el) => {
          let place = n;
          if (place === 1) {
            place = ":first_place:";
          } else if (place === 2) {
            place = ":second_place:";
          } else if (place === 3) {
            place = ":third_place:";
          } else {
            place = ":black_small_square:";
          }
          
          if (el.playername != ''){
            votelist = votelist.concat(
              place + " **" + el.playername + "** - " + el.votes + " votes \n"
            );
            n = n + 1;
          }

          
        });

        message.author.send({
          embed: {
            title: "liste des votes",
            description: votelist,

            url:
              "https://top-serveurs.net/conan-exiles/ouvert-le-0412-les-rescapes-rppvp-vocal-conquete"
          }
        });
      }
    });
  }
  
});



bot.login(process.env.BOT_TOKEN);
