const Discord = require("discord.js");
const bot = new Discord.Client();
const request = require("request");
const cron = require('cron');

let url = "https://api.top-serveurs.net/v1/servers/HURZR2SCR6/players-ranking";

let options = { json: true };

let scheduledMessage = new cron.CronJob('0 0 23 1-31 * *', () => {
  // This runs every day at 10:30:00, you can do anything you want
  const chan = bot.channels.cache.find(channel => channel.id ==='807572042857447474');
chan.send("it's works!");

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
        
        if (el.playername != '' && el.votes >= 90){
          votelist = votelist.concat(
            place + " **" + el.playername + "** - " + el.votes + " votes \n"
          );
          n = n + 1;
        }
      });


      chan.send({
        embed: {
          title: "Les Gagnants sont :",
          description: votelist,

          url:
            "https://top-serveurs.net/conan-exiles/ouvert-le-0412-les-rescapes-rppvp-vocal-conquete"
        }
      });
    }
  });

});

bot.on('ready', () => {
  scheduledMessage.start()
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


          //message.channel.send({
          message.author.send({
          embed: {
            title: "Les tops votes",
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
