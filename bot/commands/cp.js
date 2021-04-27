/*
	SensBot
	Last edit: 26/04/2020
	Creator: Skz
	Group: Sensity
*/

const Discord = require('discord.js');
const cfg = require('../config.json');

module.exports = {
	name: 'cp',
	description: 'Create project with this command!',
	execute(message) {
		const args = message.content.toLowerCase().split(/ +/g).slice(1)
		var server = message.guild;
		var name = message.author.username;
		var category = message.guild.channels.cache.find(channel => channel.name === cfg.project_category);
		
		console.log(args.toString())

		if(!message.member.roles.cache.find(r => [cfg.sensity_rank].includes(r.name))) {
			return;
		} else {
			if(message.channel.name != cfg.admin_channel) {
				message.delete();

				let target = message.author;
				const embed = new Discord.MessageEmbed()
					.setColor('#f39c12')
					.setTitle('⚠️ Problem !')
					.addFields(
						{ name: 'Why ?', value: 'You wrote the command in the wrong channel.\nYou must do it in the **#' + cfg.admin_channel + '** one.'},
					)
					.setTimestamp()
					.setFooter('v' + cfg.version)
	
				target.send(embed);

				return;
			};
			if(args.toString() === "") {
				let target = message.author;
				message.delete();
				const embed = new Discord.MessageEmbed()
					.setColor('#f39c12')
					.setTitle('⚠️ Problem !')
					.addFields(
						{ name: 'Why ?', value: 'You must write **args** in your command\nExample: **!cp project_name**.'},
					)
					.setTimestamp()
					.setFooter('v' + cfg.version)
	
				target.send(embed)
				return;
			};
			const checkchannel = message.guild.channels.cache.find(channel => channel.name === args.toString());
			if(checkchannel) {
				message.delete();
				const embed = new Discord.MessageEmbed()
					.setColor('#f39c12')
					.setTitle('⚠️ Problem !')
					.addFields(
						{ name: 'Why ?', value: 'This project already exist!'},
					)
					.setTimestamp()
					.setFooter('v' + cfg.version)

				message.guild.channels.cache.find(channel => channel.name === cfg.admin_channel).send(embed);
				return;
			};

			message.delete();
			const embed = new Discord.MessageEmbed()
				.setColor('#2ecc71')
				.setTitle('✅ Adding project')
				.addFields(
					{ name: 'Project added: ', value: args.toString()},
					{ name: 'Done by: ', value: message.author},
				)
				.setTimestamp()
				.setFooter('v' + cfg.version)

			message.guild.channels.cache.find(channel => channel.name === cfg.admin_channel).send(embed);

			const channel = server.channels.create(args.toString(), {
				type: 'text',
				parent: category,
				permissionOverwrites: [
					{
						id: server.id,
						deny: 'VIEW_CHANNEL'
					},
					{
						id: message.author.id,
						allow: 'VIEW_CHANNEL'
					}
				]
			});
		}
	},
};