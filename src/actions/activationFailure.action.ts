import { EmbedBuilder, Message } from "discord.js"
import { expiry, reminderText } from "../misc/misc";
import { leaderboards } from '../altbot';

export async function activationFailure(originalMessage: Message<boolean>) {
  // const expireTime = 30;
  if (!leaderboards.UserSettings?.[originalMessage.author.id]?.ActivationFailure) return;
    // .then(theReply => {
    //   setTimeout(() => theReply.delete(), expireTime * 1000);
    // });
}
