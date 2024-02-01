import { EmbedBuilder, Message } from "discord.js"
import { expiry, hintText } from "../misc/misc";
import { leaderboards } from '../altbot';

export async function informNewUser(originalMessage: Message<true>) {
  const expireTime = 60;
  const { author: { id: op }, guild: { id: server } } = originalMessage;
  const { AltBot, Configuration } = leaderboards;
  const serverGreenThreshold = Configuration[server].greenThreshold ?? 0;

  if (!AltBot[server]?.[op] || AltBot[server][op] <= serverGreenThreshold) {
    const embed = new EmbedBuilder()
      .setTitle("Alt Text Help")
      .setDescription(expiry(hintText, expireTime))
      .setColor(0xf4d7ff);

    await originalMessage.reply({ embeds: [embed] })
      .then(reply => setTimeout(() => reply.delete(), expireTime * 1000));
  }
}
