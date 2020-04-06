# pingbot
> A Shitpost in bot form.

## Features

### Chance-Based
For each message that is sent, there is chance that pingbot will:
 - ping @everyone (how it got it's name)
 - react with a random emoji (often eerily in-tune to the mood of the message)
 - set your nickname to a string of random characters (most fun when on a server where users can't change their own
 nicknames)

### Pingbot Love
If you send a message that shows appreciation for pingbot (if it matches this regex:
`/\bi\b.+\b(love|like|appreciate)\b.+\bpingbot\b/`), pingbot will respond with a heart to show it's appreciation of you.

### O O F
If you send a message that contains the word 'o o f', pingbot with do one of two things:
 - If you are in a voice channel, pingbot will join your voice channel, play the roblox *oof* sound, and leave.
 - If you are not in a voice channel (or if pingbot is already playing the oof sound in the server), pingbot will simply
 reply 'o o f' instead.

## Options
All options and configuration is done through environment variables. You can put your options in a `.env` file as well.

You need to specify a bot token with the `BOT_TOKEN` environment variable. The bot will not run without this.

You can configure how often pingbot will perform it's actions (a one in `x` chance of performing the action) with these
environment variables:
 - `EVERYONE_CHANCE` will affect how often pingbot pings everyone (default: `10000`).
 - `REACT_CHANCE` will affect how often pingbot reacts to messages (default: `100`).
 - `NICKNAME_CHANCE` will affect how often pingbot changes someone's nickname (default: `1000`).

## Author
**pingbot** © [Gabe Dunn](https://github.com/redxtech), Released under the [MIT](./license.md) License.

 
For each message sent it has a one in 100 (configurable) chance of pinging everyone
And if your message is "o o f" it moves you to a voice channel, plays the roblox oof, moves your back to where you were before and leaves the voice channel
And also it adds random reactions to random messages.
To set up the bot, run npm i and fill out .env with the appropriate values.
