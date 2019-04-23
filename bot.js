var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
//Intiliaze Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

//Initialize Bobby B's start sentence
var bobbyNum = getRandomInt(20);

console.log(auth.token);

bot.on('ready', function (evt) {
    logger.info("Connected");
    logger.info("Logged in as: ");
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd) {
            //!ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
			//!pickGame arg1 arg2 ...
			case 'pickGame':
				if (args.length == 0) {
					bot.sendMessage({
						to: channelID,
						message: "Must include at least one game to pick from"
					});
					break;
				}
				bot.sendMessage({
					to: channelID,
					message: args[getRandomInt(args.length)]
				});
				break;
            //!commandlist
			case 'commandlist':
				bot.sendMessage({
					to: channelID,
					message: "There will be a command list soon. Chill out."
				});
				break;
        }
    }
	//bobby b
	if(message.toLowerCase().indexOf("bobby b") > -1) {
		bot.sendMessage({
			to: channelID,
			message: bobbySentences[bobbyNum]
		});
		bobbyNum++;
	}
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var bobbySentences = [
	"TAKE ME TO YOUR CRYPT, I WANT TO PAY MY RESPECTS!",
	"WINE! WINE! MOOOOOOOOAR WINE!",
	"DID YOU HAVE TO BURY HER IN A PLACE LIKE THIS?",
	"WHO NAMED YOU? SOME HALFWIT WITH A STUTTER??",
	"SOON ENOUGH, THAT CHILD WILL SPREAD HER LEGS AND START BREEDING!",
	"PISS ON THAT! SEND A RAVEN! I WANT YOU TO STAY! I'M THE KING, I GET WHAT I WANT!",
	"THEY NEVER TELL YOU HOW THEY ALL SHIT THEMSELVES! THEY DON'T PUT THAT PART IN THE SONGS!",
	"DID YOU EVER MAKE THE EIGHT?",
	"THERE'S A WAR COMING, NED. I DON'T KNOW WHEN, I DON'T KNOW WHO WE'LL BE FIGHTING...BUT IT'S COMING!",
	"COME, BOW BEFORE YOUR KING! BOW, YA SHITS!",
	"START THE DAMN JOUST BEFORE I PISS MESELF!",
	"THE WHORE IS PREGNANT!",
	"OUT! OUT, DAMN YOU! I'M DONE WITH YOU! GO, RUN BACK TO WINTERFELL! I'LL HAVE YOUR HEAD ON A SPIKE!",
	"IT MUST WOUND YOUR PRIDE! STANDING OUT THERE, LIKE A GLORIFIED SENTRY!",
	"WE WERE AT WAR! NONE OF US KNEW IF WE WERE GONNA GO BACK HOME AGAIN!",
	"CAREFUL, NED! CAREFUL NOW!",
	"SHE SHOULD BE ON A HILL SOMEWHERE WITH THE SUN AND THE CLOUDS ABOVE HER!",
	"OHHH, SHOW US YOUR MUSCLES! YOU'LL BE A SOLDIER!",
	"DO YOU THINK IT'S HONOR THAT'S KEEPING THE PEACE?! IT'S FEAR! FEAR AND BLOOD!",
	"HOLD YOUR TONGUE!"
	];

