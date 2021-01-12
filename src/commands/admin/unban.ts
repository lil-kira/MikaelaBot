import { ICommand } from '../../classes/Command';
import { User } from 'discord.js';
import {toEmbed, UserEventInfo, UserEventType} from '../../classes/UserEventInfo';
import {CommandError} from "../../classes/CommandError";

export const command: ICommand = {
   name: 'unban',
   description: 'Unban a user',
   aliases: ['unban'],
   perms: [],
   args: true,
   userPerms: ['BAN_MEMBERS'],
   botPerms: ['BAN_MEMBERS'],

   async execute(message, args) {
      let user: User =
         message.mentions.users?.first() ||
         (await message.client.users.fetch(args[0]).catch(() => undefined));

      if (!user) {
          throw new CommandError(`Could not find user ${args[0]}`, this);
      }

      const banInfo: { user: User; reason?: string } = await message.guild
         .fetchBan(user)
         .catch(() => undefined);

      if (!banInfo) {
          throw new CommandError(`${user} is not banned`, this);
      }

      const reason = args.slice(1).join(' ');

      await message.guild.members.unban(user, reason);

      let eventInfo: UserEventInfo = {
         type: UserEventType.Unban,
         issuer: message.author,
         receiver: user,
         reason: reason
      };

      await message.channel.send(toEmbed(message, eventInfo));
   }
};
