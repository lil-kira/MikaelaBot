import { ICommand } from '../../classes/Command';
import {createCurrentlyPlayingEmbed, createFavoriteCollector, getPlayer} from '../../util/musicUtil';
import {CommandError} from "../../classes/CommandError";


export const command: ICommand = {
    name: 'CurrentSong',
    description: 'Display the currently playing song',
    aliases: ['np', 'playing', 'current', 'c'],

    async execute(message, _) {
        //Get the guilds current player
        const player = getPlayer(message);
        if (!player) return;

        const currentSong = player.currentlyPlaying;
        const stream = player.getStream();

        if (!(stream && player.currentlyPlaying)) throw new CommandError('No song currently playing', this);

        //Create embed
        const embed = createCurrentlyPlayingEmbed(stream, player)

        const msg = await message.channel.send(embed);
        await createFavoriteCollector(currentSong, msg)
    },
};
