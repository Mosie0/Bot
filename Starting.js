const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'j!'
const ownerID = '244271175608303616';

const serverStats = {
    guildID: '467174436299079700',
    totalUsersID: '480520485914804247',
    memberCountID: '480520290800107544',
    botCountID: '480520548166664192'
};
client.on('message', async message => {

    if (message.author.bot) return;
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;
    try {

        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let ops = {
            ownerID: 244271175608303616
        }

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, ops);

    } catch (e) {
        console.log(e.stack);
    }

 });

client.on('ready', () => console.log('Launched!'));

client.on('guildMemberAdd', member => {

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(member => !member.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

});

client.on('guildMemberRemove', member =>{

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(member => !member.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

});

 if(cmd === `${prefix}kick`){

    let kUser = message.guild.member(message.mention.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Cant find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command.")
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person cant be kicked!")

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.chanel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`,"jonbn123-log")
    if(!kickChannel) return message.channel.send("Cant find jonbn123-log channel.");

    kickChannel.send(kickEmbed);

    return;
 }

client.login(process.env.BOT_TOKEN);