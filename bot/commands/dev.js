/*
	SensBot
	Last edit: 26/04/2020
	Creator: Skz
	Group: Sensity
*/

const Discord = require('discord.js');
const cfg = require('../config.json');

module.exports = {
	name: 'dev',
	description: 'Every in dev commands!',
	execute(message) {
        if(message.channel.name != cfg.admin_channel) {
            console.log('pas dans botspam');
        } else {
            console.log('dans botspam');
        }
    }
}