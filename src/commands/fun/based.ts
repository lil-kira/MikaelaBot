import { ICommand } from '../../classes/Command';

const videoUrl =
    'https://cdn.discordapp.com/attachments/441778432767164427/765875762657886218/HELLO_BASED_DEPARTMENT.mp4';

export const command: ICommand = {
   name: 'Based',
   aliases: ['destiny'],
   description: 'Hello is this the based department ???? ',

   async execute(message, _) {
      await message.channel.send(videoUrl);
   }
};
