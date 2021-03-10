import { Document, Schema, model } from 'mongoose';

export interface IRole {
    name: string;
    id: string;
}

export class RoleChannel {
    channelId: string
    messages: IRoleMessage[]
}

export interface IReaction {
    reactionId: string,
    role: IRole
}

export interface IRoleTitleMessage {
    messageId: string,
    title: string,
}

export interface IRoleMessage {
    messageId: string,
    reactions: IReaction[],
    titleEmbed: IRoleTitleMessage
}

export interface IMember {
    tag: string,
    discordId: string,
    roles: IRole[]
}

export interface IServer extends Document {
    serverName: string,
    serverId: string,
    roles: IRole[],
    members: IMember[],
    memberCount: number
}

export const ServerSchema = new Schema({
    serverName: { type: String, required: true },
    serverId: { type: String, required: true },
    roles: { type: Array<IRole>(), required: true },
    roleChannel: { type: RoleChannel, required: false },
    members: { type: Array<IMember>(), required: true },
    memberCount: { type: Number, required: true }
})

export const Server = model<IServer>('servers', ServerSchema)