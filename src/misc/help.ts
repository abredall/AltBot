import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

export const HelpSelections = new StringSelectMenuBuilder()
  .setCustomId('altbot-help-selections')
  .setPlaceholder('What do you need help with?')
  .addOptions(
    new StringSelectMenuOptionBuilder()
      .setLabel('Adding alt text to my images natively')
      .setValue('native'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Adding alt text to images with AltBot')
      .setValue('reposts'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Reminders')
      .setValue('reminders'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Editing and deleting AltBot reposts')
      .setValue('edits'),
  );

const NativeHelp = new EmbedBuilder()
  .setTitle('AltBot Help - Native Alt Text')
  .setDescription(
    "Adding alt text natively through Discord is easy and bypasses needing to have your images reposted by AltBot.\n" +
    "1. Upload and attach an image\n" +
    "2. Click on the pencil next to the trash can to modify the attachment\n" +
    "3. Add a description (alt text) where indicated\n" +
    "4. Send the message!"
  );


const RepostsHelp = new EmbedBuilder()
  .setTitle('AltBot Help - Using AltBot')
  .setDescription(
    "It's easy to add alt text with AltBot!\n" +
    "The basic command format is: `<trigger> <alt text> (| <alt text2>...)`\n" +
    "AltBot supports `r!`, `alt:`, and `id:` as triggers. Multiple alt texts are split using the pipe `|` character.\n" +
    "Thus, if you post a cat pic and a dog pic, you could use this command:\n" +
    "`r! my cat sitting on a chair | my dog eating steak`\n" +
    "\n" +
    "AltBot commands can be used in a **reply** to a message that's already been sent, or at the end of a new message you want to send:\n" +
    "`Look at my cute dog!! r! my dog catching a frisbee`"
  );

const AiHelp = new EmbedBuilder()
  .setTitle('AltBot Help - Image Recognition and OCR')
  .setDescription(
    "Adding alt text becomes wicked easy with the help of AI!\n" +
    "AltBot has two AI sources and commands: GPT-4 Vision and Azure OCR.\n" +
    "To request a description of your image, use `$$` or `$$ocr` as your alt text body:\n" +
    "`r! $$` or `r! $$ocr`\n" +
    "Azure OCR is only used if you supply a description along with the OCR request:\n" +
    "`r! Screenshot of an email from my teacher $$ocr`\n" +
    "You can mix-and-match manual AltBot alts with AI alts.\n" +
    "_Note: GPT may be disabled by server admins. Azure Vision will be used instead._"
  );

const RemindersHelp = new EmbedBuilder()
  .setTitle('AltBot Help - Reminders')
  .setDescription(
    "You can choose to have AltBot remind you if you forget to add alt text.\n" +
    "To opt in/out of reminders, use `/usersetting Reminder YES`\n"
  );

const EditsHelp = new EmbedBuilder()
  .setTitle('AltBot Help - Editing and Deleting AltBot Reposts')
  .setDescription(
    "As long as you are the original author of the message, you can edit and delete content reposted by AltBot!\n" +
    "**Editing**\n" +
    "Full message replacement: Reply with `edit! New message body here`\n" +
    "Word/phrase replacement: Reply using the `sed`-like syntax `r/old/new`\n" +
    "**Deleting**\n" +
    "Reply to the message with `delete!`.\n" +
    "_Note: Editing is only supported on messages with a message body. Messages without a body cannot be edited._"
  );

const AudioHelp = new EmbedBuilder()
  .setTitle('AltBot Help - Transcribing Audio')
  .setDescription(
    "AltBot can transcribe audio/video (Limits: 5 minutes / 25 MB)\n" +
    "To request transcription, reply to the file with a transcription trigger, or add one to the message you want to send.\n" +
    "AltBot will reply to the message containing the file with the transcription.\n" +
    "Transcription uses the following triggers: `transcribe!` and `ts!`\n" +
    "Voice messages will automatically be transcribed.\n" +
    "_Note: This feature may be disabled by server admins._"
  );

  const OverridesHelp = new EmbedBuilder()
  .setTitle('AltBot Help - Overrides')
  .setDescription(
    "You can override some of AltBot's default behavior using override flags, similar to those used in command-line applications.\n" +
    "There are currently two overrides available:\n" +
    "Alt text: `--model=[gpt|azure]`.\n" +
    "To force the use of Azure OCR, for example, you can use: `r! --model=azure $$ocr`\n" +
    "Transcriptions: `--type=[text|srt]`.\n" +
    "To force the use of SRT mode for audio, you can use: `ts! --type=srt`\n" +
    "_Note: Overrides will apply to all alts/transcriptions triggered by the message._"
  );

export const HelpEmbedMap: { [key: string]: EmbedBuilder } = {
  'native': NativeHelp,
  'reposts': RepostsHelp,
  'ai': AiHelp,
  'reminders': RemindersHelp,
  'edits': EditsHelp,
  'audio': AudioHelp,
  'overrides': OverridesHelp
};
