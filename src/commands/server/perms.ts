import { ICommand } from '../../classes/Command';
import { GuildMember, Message, MessageEmbed, Role, TextChannel } from 'discord.js';
import {Embeds} from 'discord-paginationembed';
import {CommandError} from '../../classes/CommandError';

export const command: ICommand = {
   name: 'permissions',
   description: 'Show permissions for users and roles',
   aliases: ['perms'],
   args: false,

   async execute(message, args) {
      if (!(message.channel instanceof TextChannel)) {
          throw new CommandError('This command can only be used in guild channels.', this);
      }

      const target: Role | GuildMember = await getTarget(message, args);
      const perms = getPerms(target);
      await createEmbed(message.channel, perms, target);
   }
};

function getPerms(target: Role | GuildMember): MessageEmbed[] {
   const perms = target.permissions.serialize(true);

   const permData = Object.entries(perms)
      .sort()
      .map(p => {
         return {
            name: formatPermName(p[0]),
            value: p[1] ? 'Yes' : 'No',
            inline: true
         };
      });

    return [new MessageEmbed().addFields(permData.slice(0, 16)), new MessageEmbed().addFields(permData.slice(16))];
}

async function createEmbed(channel: TextChannel, embeds: MessageEmbed[], target: GuildMember | Role) {
    const avatarUrl = (target as GuildMember).user?.displayAvatarURL({dynamic: true});

    await new Embeds()
        .setArray(embeds)
        .setChannel(channel)
        .setPageIndicator('footer')
        .setTitle('Permissions')
        .setDescription(`Permissions for ${target}`)
        .setThumbnail(avatarUrl)
        .setFooter('')
      .build();
}

function formatPermName(permName: string): string {
   return permName.charAt(0) + permName.split('_').join(' ').toLowerCase().slice(1);
}

async function getTarget(message: Message, args: string[]): Promise<GuildMember | Role> {
   if (args.length > 0) {
      return (
         message.mentions.members?.first() ||
         message.mentions.roles?.first() ||
         (await message.guild.roles.fetch(args[0]).catch(() => undefined)) ||
         (await message.guild.members.fetch(args[0]).catch(() => undefined))
      );
   }

   return message.member;
}
