const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {

    if (!message.member.roles.find(r => r.name === 'roleName')) return message.channel.send('This requires role: roleName');

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires the permission: ADMINISTRATOR');

    if (!args[0]) return message.channel.send('Proper Usage: <prefix>poll question');

    const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setFooter('React to vote.')
        .setDescription(args.join(''))
        .setTitle(`Poll Created By ${message.author.username}`);

    let msg = await message.channel.send(embed);


    await msg.react(':white_check_mark:');
    await msg.react (':x:');

    message.delete({timeout: 1000});
    
}