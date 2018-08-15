const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'j!'
const ownerID = '244271175608303616';

client.on('message', message => {
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    try {

        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, messages, args);

    } catch (e) {
        console.log(e.stack);
    }

 });

client.on('ready', () => console.log('Launched!'));

client.login(process.env.BOT_TOKEN);