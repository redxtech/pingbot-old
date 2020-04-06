/*
 * Gabe Dunn 2020
 * All of pingbot is contained within this file.
 */

require('dotenv').config()
const discord = require('discord.js')
const { join } = require('path')

// global variable for OOF_READY
let OOF_READY = true

const main = () => {
  // initialize the discord.js client
  const client = new discord.Client()

  // log that the bot logged in
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
  })

  // the message listener
  client.on('message', message => {
    // if the message isn't in a dm and it's not a message sent by this bot
    // noinspection JSUnresolvedVariable
    if (message.channel.type !== 'dm' && message.member.user.id !== client.user.id) {
      // call the action functions
      pingEveryone(message)
      react(message)
      nickname(message)
      pingbotLove(message)
      oof(message)
    }
  })

  // log the bot in
  client.login(process.env.BOT_TOKEN).then().catch()
}

// has a one in <outOf> chance of returning true
const chance = outOf => random(outOf) === 1

// generates a random number up to <upTo>
const random = upTo => (Math.floor(Math.random() * upTo) + 1)

// pings everyone if the chance function returns true
const pingEveryone = message => chance(process.env.EVERYONE_CHANCE || 10000)
  ? message.channel.send('@everyone')
  : false

// reacts with a random emoji if the chance function returns true
const react = message => chance(process.env.REACT_CHANCE | 100)
  ? message.react(message.guild.emojis.cache.random())
  : false

// changes the user's nickname if the chance function returns true
const nickname = message => chance(process.env.NICKNAME_CHANCE || 1000)
  ? message.member.setNickname(generateNickname()).then().catch(err => {
    console.error(`Couldn't change ${message.member.user.tag}'s nickname: ${err}`)
  })
  : false

// generate a random string of characters to use as a nickname
const generateNickname = () => {
  // initialize empty array to store the name in
  const nicknameArray = []

  // a list of possible characters to show up in the nickname
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]\{}|;\':",./<>?'

  // the length of the nickname, between 6 & 26
  const nicknameLength = random(20) + 6

  // push a random character from the characters into the nickname array <nicknameLength> times
  for (let i = 0; i < nicknameLength; i++) {
    nicknameArray.push(characters.charAt(random(characters.length)))
  }

  // return the nickname as a string
  return nicknameArray.join('')
}

// if the message inclues some form of i love pingbot respond with a heart
const pingbotLove = message => /\bi\b.+\b(love|like|appreciate)\b.+\bpingbot\b/.test(message.content.toLowerCase())
  ? message.channel.send('heart <3')
  : false

// if the message is 'o o f' either send back 'o o f' or play the sound in voice chat
const oof = message => {
  if (message.content.toLowerCase().includes('o o f')) {
    // get the user's current voice state
    const voiceState = message.member.voice

    // if they're in a voice channel join and play the oof sound
    if (voiceState && OOF_READY) {
      // set OOF_READY to false to prevent overlapping
      OOF_READY = false

      // save the voice channel
      const channel = voiceState.channel

      // join the voice channel, play a sound, and leave
      channel.join().then(connection => {
        // play the sound file
        connection.play(join(__dirname, 'sounds', 'oof.ogg')).on('end', () => {
          console.log('done playing sound')

          // leave the channel
          channel.leave()

          // set OOF_READY back to true
          OOF_READY = true
        })
      }).catch(err => {
        // log the error
        console.error(err)

        // set OOF_READY back to true
        OOF_READY = true
      })
    } else {
      return message.channel.send('o o f')
    }
  }
}

main()
