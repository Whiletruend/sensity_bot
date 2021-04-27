/*
	SensBot
	Last edit: 25/04/2020
	Creator: Skz
	Group: Sensity
*/

const Discord = require('discord.js');
const cfg = require('../config.json');

module.exports = {
	name: 'dp',
	description: 'Delete project with this command!',
	execute(message) {
		const args = message.content.toLowerCase().split(/ +/g).slice(1)
		var server = message.guild;
		var name = message.author.username;
        var category = message.guild.channels.cache.find(channel => channel.name === cfg.project_category);
        
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
                        { name: 'Why ?', value: 'You must write **args** in your command\nExample: **!dp project_name**.'},
                    )
                    .setTimestamp()
                    .setFooter('v' + cfg.version)
    
                target.send(embed)
                return;
            }
			const checkchannel = message.guild.channels.cache.find(channel => channel.name === args.toString());
            if(!checkchannel) {
				message.delete();
				const embed = new Discord.MessageEmbed()
					.setColor('#f39c12')
					.setTitle('⚠️ Problem !')
					.addFields(
						{ name: 'Why ?', value: 'This project do not exist!'},
					)
					.setTimestamp()
					.setFooter('v' + cfg.version)

				message.guild.channels.cache.find(channel => channel.name === cfg.admin_channel).send(embed);
				return;
			}

			message.delete();
			const embed = new Discord.MessageEmbed()
				.setColor('#e74c3c')
				.setTitle('⛔️ Removing project')
				.addFields(
					{ name: 'Project removed: ', value: args[0]},
					{ name: 'Done by: ', value: message.author},
				)
				.setTimestamp()
				.setFooter('v' + cfg.version)

			message.guild.channels.cache.find(channel => channel.name === cfg.admin_channel).send(embed);

			const fetch = message.guild.channels.cache.find(r => r.name === args.join(' '));
			fetch.delete();
		}
	},
};