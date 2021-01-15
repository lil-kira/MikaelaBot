import { GuildMember, Client, PartialGuildMember, TextChannel } from 'discord.js';
import { owner_server_id, welcome_channel_id } from '../config';

export function initGreeter(client: Client) {
    client.on('guildMemberAdd', member => greetMember(member));
}

function greetMember(member: GuildMember | PartialGuildMember) {
    // Check if member is from coders club
    if (member.guild.id !== owner_server_id) return;

    // setup content message
    let content = `>>> Welcome **${member.toString()}**`;
    content += `\nYou can pick out some roles from **<#618438576119742464>**`;

    // get welcome channel
    const channel = member.guild.channels.cache.get(welcome_channel_id);

    if (!channel) return;
    if (channel instanceof TextChannel) channel.send(content);
}
