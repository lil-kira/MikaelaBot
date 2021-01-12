import { ICommand } from '../../classes/Command';
import { GuildMember } from 'discord.js';
import {toEmbed, UserEventInfo, UserEventType} from '../../classes/UserEventInfo';
import {CommandError} from "../../classes/CommandError";

export const command: ICommand = {
   name: 'kick',
   description: 'Kick a user',
   aliases: ['kick'],
   perms: [],
   args: true,
   userPerms: ['KICK_MEMBERS'],
   botPerms: ['KICK_MEMBERS'],

   async execute(message, args) {
      let member: GuildMember =
         message.mentions.members?.first() ||
         (await message.guild.members.fetch(args[0]).catch(() => undefined));

      if (!member) {
          throw new CommandError(`Could not find member ${args[0]}`, this);
      }
      if (!member.kickable) {
          throw new CommandError(`Cannot kick ${member}`, this);
      }

      const reason = args.slice(1).join(' ');

      await member.kick(reason);

      let eventInfo: UserEventInfo = {
         type: UserEventType.Kick,
         issuer: message.author,
         receiver: member.user,
         reason: reason
      };

      await message.channel.send(toEmbed(message, eventInfo));
   }
};
