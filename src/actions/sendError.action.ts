import { EmbedBuilder, TextChannel } from "discord.js";
import { CLIENT, leaderboards } from "../altbot";

export async function sendError(guildId: string, errorTitle: string, errorBody: string, authorId: string|number, url: string) {
  let chan = leaderboards.Configuration[guildId].errorChannel;
  // console.log(CLIENT);
  const embed = new EmbedBuilder()
    .setTitle(`Error: ${errorTitle}`)
    .setDescription(`${errorBody}\nAuthor ${authorId}\nURL ${url}`)
    .setColor(0xf4d7ff);
    const channel = CLIENT.channels.cache.get(chan)
    if (!channel?.isTextBased()) return;
    await channel.send({ embeds: [embed] })
}
