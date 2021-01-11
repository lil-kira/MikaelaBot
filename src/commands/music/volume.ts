import { getPlayer } from '../../util/musicUtil';
import { ICommand } from '../../classes/Command';
import { logger } from '../../app';

export const command: ICommand = {
   name: 'volume',
   description: 'Change the volume',
   aliases: ['v'],
   usage: '[- | + | number]\n\nDisplays the volume if no arguments given',
   hidden: true,
   perms: ['kira'],
   isDisabled: false,

   async execute(message, args) {
      // if (!args.find(arg => arg === '-f')) return;

      const arg = args.shift();
      const player = getPlayer(message);
      if (!player) {
         logger.log('info', 'no player found while using volume command');
         return;
      }

      if (!arg) {
         throw Error(`Volume is currently ${player.volume}`);
      }

      let amount: number | undefined;

      if (arg === '-') {
         amount = player.volume - 0.5;
      } else if (arg === '+') {
         amount = player.volume + 0.5;
      } else if (Number(arg)) {
         amount = Number(arg);
      }

      if (amount) {
         player.changeVolume(amount, message);
      }
   }
};
