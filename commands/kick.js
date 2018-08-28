const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
let kUser = message.mention.users.first() || message.guild.members.get(args[0])
if(!kUser) return message.channel.send(`Can't Find that User!`);
let kReason = agrs.slice(1).join(' ');
if(!kReason) kReason = "No Reason Provided";
if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`You don't have the permission to run this command!`);
if(kUser.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Can't Kick another Staff Member`);
    let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.chanel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);
    let kickChannel = message.guild.channels.find(c => c.name === "jonbn123-log")
    if (!kickChannel) return message.channel.send("Cant find jonbn123-log channel.");
    kickChannel.send(kickEmbed);
}
module.exports.help = {
    name: "kick"
}