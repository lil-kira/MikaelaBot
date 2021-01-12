import { ICommand } from '../../classes/Command';

const yubiLink = 'https://cdn.discordapp.com/attachments/644126670080573460/764113835291705384/korone_yaaay.webm';

export const command: ICommand = {
   name: 'yubi',
   description: 'YUBI YUBI!!! 🐱‍💻',
   aliases: ['yubiyubi', 'finger', 'yaay', 'yay'],

   async execute(message, args: string[]) {
      await message.channel.send(yubiLink);
   }
};
