/*
	SensBot
	Last edit: 26/04/2020
	Creator: Skz
	Group: Sensity
*/

const Discord = require('discord.js');
const cfg = require('../config.json');

module.exports = {
	name: 'add',
	description: 'Add someone from the project with this command!',
	execute(message) {
		const args = message.content.toLowerCase().split(/ +/g).slice(1)
		var server = message.guild;
		var name = message.author.username;
		var targetMember = message.mentions.users.first();
		var targetChannel = args[1];

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
						{ name: 'Why ?', value: 'You must write **args** in your command\nExample: **!add @member_name project_name**.'},
					)
					.setTimestamp()
					.setFooter('v' + cfg.version)
	
				target.send(embed)
				return;
			};
			if(targetMember === undefined) {
				let target = message.author;
				message.delete();
				const embed = new Discord.MessageEmbed()
					.setColor('#f39c12')
					.setTitle('⚠️ Problem !')
					.addFields(
						{ name: 'Why ?', value: "You forgot to write **'@'** before the name.\nExample: **!add @member_name project_name**\n\nOr maybe you tried to write **@everyone**, and that's why it's not working.."},
					)
					.setTimestamp()
					.setFooter('v' + cfg.version)
	
				target.send(embed)
				return;
			};

			const channel = message.guild.channels.cache.find(channel => channel.name === targetChannel);
			if(channel) {
				message.delete();
				const embed = new Discord.MessageEmbed()
					.setColor('#2ecc71')
					.setTitle('✅ Adding user to a project')
					.addFields(
						{ name: 'User added: ', value: targetMember.username},
						{ name: 'Channel concerned: ', value: channel.name},
						{ name: 'Done by: ', value: message.author},
					)
					.setTimestamp()
					.setFooter('v' + cfg.version)

				message.guild.channels.cache.find(channel => channel.name === cfg.admin_channel).send(embed);
				channel.createOverwrite(targetMember, {
					'VIEW_CHANNEL': true
				});
			} else {
				message.delete();
				const embed = new Discord.MessageEmbed()
					.setColor('#f39c12')
					.setTitle('⚠️ Problem !')
					.addFields(
						{ name: 'Why ?', value: 'This channel or user do not exist!'},
					)
					.setTimestamp()
					.setFooter('v' + cfg.version)

				message.guild.channels.cache.find(channel => channel.name === cfg.admin_channel).send(embed);
				return;
			};
		};
	},
};
