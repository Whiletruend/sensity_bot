/*
	SensBot
	Last edit: 26/04/2020
	Creator: Skz
	Group: Sensity
*/

const Discord = require('discord.js');
const cfg = require('../config.json');

module.exports = (client, member) => {
	// Var
	const channel = member.guild.channels.cache.find(channel => channel.name === cfg.welcome_channel);
	let rank = member.guild.roles.cache.find(role => role.name === cfg.base_rank);

	// Secure
	if(!channel) return;

	// What it do
	member.roles.add(rank)
	var message = "\n**Make sure to check the rules at " + member.guild.channels.cache.find(channel => channel.name === cfg.rules_channel).toString() + " \nYou can also visite our website at https://www.sensity.net/**";

	const embed = new Discord.MessageEmbed()
		.setColor('#2ecc71')
		.setThumbnail(member.user.displayAvatarURL({ format: 'jpg' }))
		.setTitle("🎉 Welcome on the Sensity's server !")
		.addFields(
			{name: 'The new user is:', value: `${member}`},
			{name: "\u200b", value: message},
		)
		.setTimestamp()
		.setFooter('v' + cfg.version)
	
	channel.send(embed);
}
