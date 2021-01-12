import { logger } from '../../app';
import { ICommand } from '../../classes/Command';
import { addFavoriteToUser } from '../../db/userController';
import { getSong, isPlaylist } from '../../util/apiUtil';
import { QuickEmbed } from '../../util/styleUtil';

export const command: ICommand = {
    name: 'add',
    description: 'Add a song to your favorites',
    usage: '[search | url]',
    args: true,
    cooldown: 1,

    async execute(message, args) {
        const query = args.join();
        try {
            const song = await getSong(query);

            if (isPlaylist(song)) {
                return QuickEmbed(message, 'Cannot add playlists to your favorites... this feature is coming soon.');
            }

            if (!song) return QuickEmbed(message, 'song not found');

            await addFavoriteToUser(message.author, song, message);
        } catch (err) {
            logger.log('error', err);
        }
    }
};
