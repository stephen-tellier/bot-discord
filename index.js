const Discord = require("discord.js");
const bot = new Discord.Client();
const request = require("request");

let url = "https://api.top-serveurs.net/v1/servers/HURZR2SCR6/players-ranking";

let options = { json: true };

bot.on("ready", function () {});

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
            title: "Les tops votes",
            description: votelist,

            url:
              "https://top-serveurs.net/conan-exiles/ouvert-le-0412-les-rescapes-rppvp-vocal-conquete"
          }
        });
      }
    });
  }
  if (message.content === "!printtopvote") {
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
            title: "Winner !",
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
