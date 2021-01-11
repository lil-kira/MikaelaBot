import { ICommand } from '../../classes/Command';

const videoLink =
    'https://cdn.discordapp.com/attachments/702091543514710027/775342464152109096/degenerates.mp4';

export const command: ICommand = {
   name: 'degenerates',
   description: 'You guys are degenerates 😿',
   aliases: ['degen'],

   async execute(message, _: string[]) {
      await message.channel.send(videoLink);
   }
};
