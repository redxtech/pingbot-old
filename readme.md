# pingbot
> A shitpost in bot form.

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

## Setup
Setup is simple:
 1. Clone the bot.
 2. Install the dependencies with `yarn` (or `npm install`). If either of these commands don't work, you need to install
 [node][2].
 3. Create a bot user & invite it to your server (follow [this guide][1], but use the code in this repo as the bot's
 code).
 4. Create a `.env` file and set `BOT_TOKEN` equal to the token obtained in the previous step.
 5. Add your desired options to the `.env` file.
 6. Run the bot with `yarn start` (or `npm run start`). Alternatively you can run it with `node ./src/index.js`.
 7. Enjoy!

[1]: https://www.howtogeek.com/364225/how-to-make-your-own-discord-bot/
[2]: https://nodejs.org

### Personal Recommendation
When creating the bot user, you are most likely going to want to choose an image for pingbot to use as a profile
picture. My personal favourite is shown below with two variations: normal and pinged. I recommend these because they
perfectly capture the essence of the bot, and they were the server icon of the server this bot was written for.

![pingbot][normal]
![pingbot pinged][pinged]

[normal]: resources/pingbot.png
[pinged]: resources/pingbot_pinged.png

## Author
**pingbot** © [Gabe Dunn](https://github.com/redxtech), Released under the [MIT](./license.md) License.
