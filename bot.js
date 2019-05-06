const Discord = require('discord.js');
var auth = require('./auth.json');
const client = new Discord.Client();

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//The ready event is vital, it means that only _after_ this will your bot start reacting to information received from Discord
client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        var commandList = ["ping", "pickGame", "commandlist"];
        args = args.splice(1);
        switch (cmd) {
            //!ping
            case 'ping':
                message.channel.send('pong');
                break;
            //!pickGame arg1 arg2 ...
            case 'pickGame':
                if (args.length == 0) {
                    message.channel.send('Must include at least one game to pick from')
                    break;
                }
                message.channel.send(args[getRandomInt(args.length)]);
                break;
            //!commandlist
            case 'commandlist':
                message.channel.send(commandList.join('\r\n'));
                break;
        }
    }
    //Initialize Bobby B's start sentence
    var bobbyNum = getRandomInt(20);
    //bobby b
    if (message.content.toLowerCase().indexOf("bobby b") > -1) {
        message.channel.send(bobbySentences[bobbyNum]);
        bobbyNum++;
    }
});

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