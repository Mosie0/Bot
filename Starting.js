const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'J!'
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

 client.on("ready", async () => {
    client.user.setActivity(`j!help | I watch over ${client.guilds.size} Servers, and ${client.users.size} Users`, { type: "WATCHING" });
 console.log("Launched!")
 });

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

client.login(process.env.BOT_TOKEN);