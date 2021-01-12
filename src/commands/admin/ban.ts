import { ICommand } from '../../classes/Command';
import { GuildMember, User } from 'discord.js';
import {toEmbed, UserEventInfo, UserEventType} from '../../classes/UserEventInfo';
import {CommandError} from '../../classes/CommandError';

export const command: ICommand = {
   name: 'ban',
   description: 'Ban a user',
   aliases: ['ban'],
   perms: [],
   args: true,
   userPerms: ['BAN_MEMBERS'],
   botPerms: ['BAN_MEMBERS'],

   async execute(message, args) {
       let user: User =
           message.mentions.users?.first() || (await message.client.users.fetch(args[0]).catch(() => undefined));

      if (!user) {
          throw new CommandError(`Could not find user ${args[0]}`, this);
      }
      if (user instanceof GuildMember && !user.bannable) {
          throw new CommandError(`Cannot kick ${user}`, this);
      }

       const banInfo: { user: User; reason?: string } = await message.guild.fetchBan(user).catch(() => undefined);

      if (banInfo) {
          throw new CommandError(`${user} is already banned`, command);
      }

      const deleteMessageDays = +args.slice(-1) || 0;

      if (deleteMessageDays < 0 || deleteMessageDays > 7) {
          throw new CommandError(`Can only delete messages between 0 and 7 days, was ${deleteMessageDays}`, this);
      }

      const reason = args.slice(1, -1).join(' ');

      await message.guild.members.ban(user, {
         reason: reason,
         days: deleteMessageDays
      });

      let eventInfo: UserEventInfo = {
         type: UserEventType.Ban,
         issuer: message.author,
         receiver: user,
         deleteMessageDays: deleteMessageDays,
         reason: reason
      };

      await message.channel.send(toEmbed(message, eventInfo));
   }
};
