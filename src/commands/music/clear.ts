import { MessageEmbed } from 'discord.js';

import { getPlayer } from '../../util/musicUtil';
import { ICommand } from '../../classes/Command';
import { embedColor } from '../../util/styleUtil';
import { logger } from '../../app';

export const command: ICommand = {
   name: 'clear',
   description: 'Clears the queue',

   async execute(message, _) {
      const player = getPlayer(message);
      if (!player) {
         logger.log('warn', `player not found for guild ${message.guild.name}`);
         return;
      }

      player.clearQueue();
      const embed = new MessageEmbed().setAuthor(
         message.author.username,
         message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setColor(embedColor);
      embed.setTitle(`Queue cleared by ${message.author.username}`);

      await message.channel.send(embed);
   }
};
