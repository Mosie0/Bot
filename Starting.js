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

const db = require('quick.db');

client.on('message', async message => {

    if (message.author.bot) return;
    if (message.channel.type !== 'text'){

        let active = await db.fetch(`support_${message.author.id}`);

        let guild = client.guilds.get('guildID');

        let channel, found = true;

        try {
            if (active) client.channels.get(active.channelID).guild;
        } catch (e) {
            found = false;
        }
        if (!active || !found){

            active = {};

            channel = await guild/channels.create(`${message.author.username}-${message.author.discriminator}`, {
                parent: `categoryID`,
                topic: `?complete to close the ticket | Surpport for ${message.author.tag} | ID: ${message.author.id}`
            });

            let author = message.author;

            const newChannel = new Discord.Message.Embed()
                .setColor(0x36393e)
                .setAuthor(author.tag, author.displayAvatarURL())
                .setFooter('Support Ticket Created')
                .addField('User', author)
                .addField('ID', author.id)

            await channel.send(newChannel);

            const newTicket = new Discord.MessageEmbed()
                .setColor(0x36393e)
                .setAuthor(`Hello, ${author.tag}`, author.displayAvatarURL())
                .setFooter('Support Ticket Created')

                await author.send(newTicket);

                active.channelID = channel.id;
                active.targetID = author.id;
        }

            channel = client.channels.get(active.channelID);

            const dm = new Discord.MessageEmbed()
                .setColor(0x36393e)
                .setAuthor(`Thank you, ${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter(`Your message has been sent -- A staff member will be in contact soon`)

            await message.author.send(dm);

            const embed = new Discord.MessageEmbed()
                .setColor(0x36393e)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(message.content)
                .setFooter(`Message Recieved -- ${message.author.tag}`)

            await channel.send(embed);

            db.set(`support_${message.author.id}`, active);
            db.set(`supportChannel_${channel.id}`, message.author.id);
            return;

        }

    let support = await db.fetch(`supportChannel_${message.channel.id}`);

    if (support) {

            support = await db.fetch(`support_${support}`);

        let supportUser = client.users.get(support.targetID);
        if (!supportUser) return message.channel.delete();

        if (message.content.toLowerCase() === '?complete') {

            const complete = new Discord.MessageEmbed()
                .setColor(0x36393e)
                .setAuthor(`Hey, ${supportUser.tag}`, supportUser.displayAvatarURL())
                .setFooter('Ticket Closed -- Jonbn123 Discord')
                .setDescription('*Your ticket has been marked as **complete**. If you wish to reopen this, or create a new one, please send a message to the bot.')

            supportUser.send(complete);

            message.channel.delete();

            db.delete(`support_${support.targetID}`);

            }

            const embed = new Discord.MessageEmbed()
                .setColor(0x36393e)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setFooter(`Message Recieved -- Jonbn123 Discord`)
                .setDescription(message.content)

                client.users.get(support.targetID).send(embed)

                message.delete({timeout: 1000});

                embed.setFooter(`Message Sent -- ${supportUser.tag}`).setDescription(message.content);

                return message.channel.send(embed);
        }

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

client.login(process.env.BOT_TOKEN);