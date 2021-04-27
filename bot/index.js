/*
	SensBot
	Last edit: 24/04/2020
	Creator: Skz
	Group: Sensity
*/

// Base const
const fs = require('fs');
const Discord = require('discord.js');
const { token, prefix, welcome_channel, version } = require('./config.json');
const client = new Discord.Client();

// Setup Bot
client.commands = new Discord.Collection();

// Folders redirections
const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventsFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for(const file of eventsFiles) {
	const files = require(`./events/${file}`);
	const eventName = file.split('.')[0]
	client.on(eventName, files.bind(null, client));
};

for(const file of commandsFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
};

client.on('ready', () => {
	const guild = client.guilds.cache.get('688878971764736079');
	console.log('Total members on the server: ' + guild.memberCount);
	console.log('SensBot ready!');
});


// Command system
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;
	client.commands.get(command).execute(message, args);
});
client.login(token); 
