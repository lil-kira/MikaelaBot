import {MessageEmbed} from 'discord.js';

import {getPlayer} from '../../util/musicUtil';
import {ICommand} from '../../classes/Command';
import {embedColor} from '../../util/styleUtil';
import {CommandError} from "../../classes/CommandError";

export const command: ICommand = {
    name: 'Skip',
    description: 'Skip song',
    aliases: ['fs', 'next'],

    async execute(message, _) {
        //Get the guilds player
        const player = getPlayer(message);
        if (!player) return;

        //Get the current playing song
        const currentSong = player.currentlyPlaying;
        if (!currentSong) throw new CommandError(`No song currently playing`, this);

        //Create an embed with the information of the song to be skipped
        const embed = new MessageEmbed()
           .setColor(embedColor)
           .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`Skipped Song: ${currentSong.title}`)
            .setDescription(currentSong.url);

        player.skipSong();
        await message.channel.send(embed);
    },
};
