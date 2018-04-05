require('dotenv').config()
const discord = require('discord.js')

const client = new discord.Client()
let oofReady = true
let wew
let general
let bestWew

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
  wew = client.guilds.get(process.env.WEW_SERVER_ID)
  general = wew.channels.get(process.env.WEW_GENERAL_CHANNEL)
  bestWew = wew.emojis.array().
    filter(emoji => emoji.id.toString() === process.env.WEW_EMOJI_ID)[0]
})

client.on('message', msg => {
  if (msg.channel.type !== 'dm' && msg.member.user.id !== client.user.id) {
    // Calculate chances of events.
    const react = (Math.floor(Math.random() * process.env.REACT_CHANCE) + 1) ===
      1
    const everyone = (Math.floor(Math.random() * process.env.EVERYONE_CHANCE) +
      1) === 1
    const nick = (Math.floor(Math.random() * process.env.NICK_CHANCE) + 1) === 1
    // Get lowercase of message.
    const lowMsgContent = msg.content.toLowerCase()

    // Do bot things.
    if (react) {
      const reaction = wew.emojis.array()[Math.floor(Math.random() *
        wew.emojis.array().length)]
      msg.react(reaction)
    }

    if (everyone) {
      general.send('@everyone')
    }

    if (lowMsgContent.includes('i ') && lowMsgContent.includes(' love ') &&
      lowMsgContent.includes(' pingbot')) {
      msg.channel.send('heart <3')
    }

    if (nick) {
      const nameArray = []
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const nameLength = (Math.floor(Math.random() * 20) + 6)
      for (let i = 0; i < nameLength; i++) {
        nameArray.push(chars.charAt(Math.floor(Math.random() * chars.length)))
      }
      const name = nameArray.join('')
      msg.member.setNickname(name)
    }

    if (lowMsgContent === 'o o f') {
      // o o f
      oofReady = false
      const voiceChannels = msg.guild.channels.array().
        filter(channel => channel.type === 'voice')
      if (voiceChannels.length >= 1) {
        const currentVoiceChannel = msg.member.voiceChannel
        const oofVoiceChannel = voiceChannels[0]
        msg.member.setVoiceChannel(oofVoiceChannel)
        oofVoiceChannel.join().then(connection => {
          const dispatcher = connection.playFile(`${__dirname}/sounds/oof.ogg`)
          dispatcher.on('end', () => {
            oofVoiceChannel.leave()
            msg.member.setVoiceChannel(currentVoiceChannel)
            oofReady = true
          })
        }).catch(err => console.log(err))
      } else {
        msg.reply('o o f')
      }
    }
  }
})

client.login(process.env.BOT_TOKEN)