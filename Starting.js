const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'j!'
const ownerID = '244271175608303616';

client.on('message',nessage =>{
let args = message.content.slice(prefix.length)
});

client.on('ready', () =>console.log('Launched!'));

client.login(process.env.BOT_TOKEN);