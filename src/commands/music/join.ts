import { getPlayer } from '../../util/musicUtil';
import { ICommand } from '../../classes/Command';

export const command: ICommand = {
    name: 'join',
    description: 'Joins voice',

    async execute(message, _) {
       //Get the guilds player
       const player = getPlayer(message);

       if (player) {
          //Join the VoiceChannel
          player.join(message);
       }
    }
};
