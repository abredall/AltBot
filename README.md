# AltBot - A Discord Accessibility Bot

AltBot is a simple, easy-to use bot whose core focus is making alt text easier to write and use.

## Major Features

### Add alt text to a message you already sent

Discord currently doesn't allow you to edit or add alt text once your message has been sent. With AltBot, however, you can reply to the message you want to add alt text to, and AltBot will repost your message (including reply status and @mentions) with the alt text you wanted.

### Add alt text to someone else's message

Adding alt text to someone else's message works exactly the same as adding after-the-fact alt text to your own message. This is useful if someone doesn't add alt text, or if their alt text is inaccurate or lacking detail. AltBot will repost the message, including a blurb saying who wrote the original message, and who added the alt text. This helps with accountability and keeps everyone aware of what repost is what.

### Add alt text to a new message

You can use AltBot on a message you haven't sent yet by including a trigger at the end of the message body, triggering an automatic repost with the specified alt text. This is useful if you want to use some of AltBot's more advanced features, or if you just want to bypass Discord's native alt text input box.

## Additional Features

### Missing Alt Text Reaction

AltBot will react to messages that are missing alt text. By default, the ❌ emoji is used, but this can be changed in the server settings. This reaction allows for easy distinction between messages with and without alt text, even when Discord's alt text display feature is disabled in your client.

### Leaderboards

Why _not_ gamify accessibility? AltBot comes with three leaderboards:

- **Native** - This leaderboard keeps track of the number of messages sent using Discord's built-in alt text feature
- **AltBot** - This leaderboard keeps track of the number of AltBot reposts triggered
- **Loserboard** - This leaderboard keeps track of the number of messages sent without alt text. Using AltBot to repost your own message will decrement this board.

A bit more on the Loserboard: The loserboard can be configured to notify moderators in a mod channel when a user's Loserboard score reaches certain thresholds. What you do with this information is up to you. One suggestion: an Image Mute.

## User Settings

There are several settings that users can set on themselves. Each user setting is a boolean value, either ON or OFF.

- **Reminder** - Posts a mini-tutorial each time the user forgets to use alt text
- **Activation Failure** - A meme setting; posts a gif when the user attempts to activate AltBot but fails

## Usage

All AltBot reposts begin with a trigger. Currently-accepted triggers are `r!` (alias: `!r`), `alt:`, and `id:`. Servers can disable individual triggers if they want/need to.

- **Add alt text to an existing message** - _Reply_ to the message, beginning with a trigger, then the alt text you want to apply
    - ex: `r! Tabby kitten sitting in a sink`
- **Add alt text to a new message** - Write a message as normal, then add a trigger and alt text at the end
    - ex: `I had a lot of fun at the beach yesterday. id: sunset over the ocean`
- **Multiple images** - Use the vertical pipe character ` | ` to separate alt texts
    - ex: `r! cat sitting on stairs | dog sitting on stairs`
- **Edit Reposted Message**
    - **Whole message** - Reply to the message with the trigger word `edit!` followed by the new message body
    - **Typo correction** - Reply to the message with the sed-like syntax `r/old/new`, where `old` will be replaced by `new`
        - ex: `This is my mom's dog, Bingo.` + `r/mom/dad` = `This is my dad's dog, Bingo.`
    - **NOTE**: Edits can only be performed on messages with a message body. You cannot retroactively add a message body.
- **Delete Reposted Message** - Reply to the message with the trigger word `delete!`

Edit and Delete commands will only work if you are the original poster of the message, regardless who initiated the repost.

## Setup

 - Note: AltBot has been tested using `Node 21.6.1`
 - AltBot requires a [Firebase Real-Time Database](https://firebase.google.com/docs/database) for logging and leaderboards. The base tier is free, and it is highly unlikely AltBot will ever generate enough data to exceed the base tier.

1. Clone the AltBot repository
2. Create a [Discord Bot Application](https://discord.com/developers/applications) and note the API token
3. Set up a Firebase project with a Realtime Database
4. Download the `firebase.json` file from Firebase (hint: create an app in the firebase console)
6. Create a `.env` file in the project root and add the following to it: 

 - `TOKEN=[yourtoken]`
 - `DATABASE_URL=[databaseurl]`
 - `CV_API_KEY=`
 - `CV_ENDPOINT=`
 - `OPENAI_API_KEY=`

7. Place your `firebase.json` in the root folder.
8. In the firebase database, set the guild configuration for your server at `/Configuration/[guildID]`:

```typescript
{
  ai: boolean,
  altrules: "default" | string,
  enableWarnings: boolean,
  errorChannel: string (channelID),
  errorMismatch: "default" | string (emojiID),
  errorNoAlt: "default" | string (emojiID),
  errorNotReply: "default" | string (emojiID),
  greenThreshold: number,
  leaderboard: boolean,
  loserboard: boolean,
  modChannel: string (channelID),
  modRole: int (roleId),
  muteThreshold: number (0 to disable),
  specialWarnThresholds: number[] (ignores enableWarnings value),
  placeInMessageBodyMode: "off" | "all" | "description",
  disabledTriggers: string[] | undefined,
  openai: boolean,
  linkedImageLoserboard: boolean
}
```

_Some of these options are not yet implemented. Data types and names may change._

### Development

Pull requests are always welcome.

### License

AltBot is licensed under LGPL v3.0.


©2024 abredall.
