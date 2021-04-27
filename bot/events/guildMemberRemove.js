/*
	SensBot
	Last edit: 26/04/2020
	Creator: Skz
	Group: Sensity
*/

const Discord = require('discord.js');
const cfg = require('../config.json');

module.exports = async (client, member) => {
	// Var
	const channel = member.guild.channels.cache.find(channel => channel.name === cfg.welcome_channel);
	let rank = member.guild.roles.cache.find(role => role.name === cfg.base_rank);

	// Secure
	if(!channel) return;

	const embed = new Discord.MessageEmbed()
		.setColor('#e74c3c')
		.setThumbnail(member.user.displayAvatarURL({ format: 'jpg' }))
		.setTitle("👋 Someone left the Sensity's server !")
		.addFields(
			{name: 'The user was:', value: `${member}`},
		)
		.setTimestamp()
		.setFooter('v' + cfg.version)
	
	channel.send(embed);
}
