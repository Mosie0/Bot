exports.run = (client, message, args, ops) => {

if (message.author.id !== ops.ownerID) return message.channel.send('Sorry, only the owner can use this command.');

try {
    delete require.cache[require.resolve(`./{args[0]}.js`)];
}catch (e) {
    return message.channel.send(`unable to reload ${args[0]}`);
}

message.channel.send(`Successfully reload: ${args[0]}`);

}