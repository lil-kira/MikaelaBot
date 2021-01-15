
// Get arguments from node
export const args = require('minimist')(process.argv.slice(2));

// Returns true if --production is an argument
export const isProduction = args['production'];


//------ PREFIX ------
// Set default prefix here
// prefix can also be set in the command line by using --prefix=
//example: node out/app.js --prefix=$


// prefix used in production
const production_prefix = '.';

// prefix used in development
const dev_prefix = '!';

//--------------------



//------ BOT TOKEN ------

const dev_token = 'bot token for development';

const production_token = 'bot token for production';

//-----------------------



//------ Owner Server (Optional) ------

// user to get heart emoji for favorites
export const owner_server_id = 'server id';

export const welcome_channel_id = 'channel to welcome people'

// If true will welcome new users to your server
export const welcomeUsers = false;

//--------------------------------------



//------ DATABASE ------
// Please set your mongodb uri here
//@ts-ignore
const prodDB = 'DB URI FOR PRODUCTION';
const devDB = 'DB URI FOR DEVELOPMENT';
//------------------------


//------ PERMISSIONS ------

interface permission {
    name: string, // the name of the permission
    users: string[] // Array of user id's
}

// Commands take permissions, set id's for users who are able to access these permissions.
export const perms: permission[] = [
    {
        name: 'owner',
        users: ['user id', 'user id']
    },
    {
        name: 'admin',
        users: ['']
    },
    {
        name: 'moderators',
        users: []
    }
];

//-------------------------


const cmdPrefix = args['prefix'];
let tempPrefix = isProduction ? production_prefix : dev_prefix

// If a prefix was set as a node argument, then override the current prefix
if (cmdPrefix) tempPrefix = cmdPrefix

export const prefix = tempPrefix;

export const token = isProduction ? production_token : dev_token;

export const dbURI = isProduction || args['prodDB'] ? prodDB : devDB;
