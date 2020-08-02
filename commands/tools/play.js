const Discord = require('discord.js');
const ytdl = require('ytdl-core');



module.exports = {
	name: 'play',
	description: 'technically a radio command but eeeeeeh',


async execute(message, args) {

if (message.channel.type !== 'text') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=uReB_e5DCA8', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);
 


			dispatcher.on('finish', () => setTimeout(function(){voiceChannel.leave()}, 2000));
		});
}
}