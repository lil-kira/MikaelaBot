import {ICommand} from './Command';

export class CommandError {
    constructor(message: string, command: ICommand) {
        this.message = message;
        this.command = command;
    }

    message: string;
    command: ICommand;
}
