const Discord = require("discord.js");
exports.run = async (client, message, args) => {
    const useruser = "Command Ran By: " + message.author.username;
    const userurl = message.author.avatarURL;
    let botembed = new Discord.RichEmbed()
        .setColor("#000FF")
        .setDescription(`<a:Dots:426956230582599690> Loading......`)
        .setTimestamp()
    message.channel.send(botembed).then(message => {
        botembed.setColor("#000FF")
        botembed.setDescription(`:ping_pong: Pong! **\`${client.pings[0]}ms\`**`)
        botembed.setFooter(useruser, userurl)
        botembed.setTimestamp()
        message.edit(botembed)
    })
}