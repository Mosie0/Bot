const Discord = require('discord.js');
const ms = require('ms');
module.exports.run = async (bot, message, args) => {
    let totalSeconds = (bot.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let uptime = (`${hours} Hours\n${minutes} Minutes\n${seconds} Seconds`);
        const embed = new Discord.RichEmbed()
        .setColor(`#FF000`)
        .addField(`Uptime`, uptime)
        .setFooter(`Command Ran By: ${message.author.username}`, message.author.avatarURL)
    message.channel.send(embed);
}
module.exports.help = { 
    name: "uptime"
}