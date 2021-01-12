import { MessageEmbed } from 'discord.js';
import {ICommand} from '../../classes/Command';
import {embedColor} from '../../util/styleUtil';
import {findFavorite} from './play';
import {CommandError} from '../../classes/CommandError';

export const command: ICommand = {
    name: 'info',
    description: 'Get a songs info',
    aliases: ['i'],
    args: true,
    usage: '',

    async execute(message, args) {
        const favInfo = await findFavorite(message, args);
        const song = favInfo.song;

        if (!song || song instanceof Array) throw new CommandError(`Song not found`, this);

        const embed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle(song.title)
            .setURL(song.url)
            .setDescription(`id: ${song.id}`)
            .addField('Duration', song.duration.duration)
            .setURL(song.url);

        await message.channel.send(embed);
    }
};
