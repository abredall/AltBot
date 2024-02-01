import { ActionRowBuilder, EmbedBuilder, GuildMemberRoleManager, Interaction, Message, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { ServerValue } from "firebase-admin/database";
import { postLeaderboard, postLoserboard, postRank } from '../misc/leaderboards';
import { generateAllowedMentions } from "../actions/generateAllowedMentions.action";
import { expiry, whyText } from '../misc/misc';
import { VERSION, db, leaderboards } from '../altbot';
import { checkIsOP } from "../actions/checkIsOP.action";
import { HelpEmbedMap, HelpSelections } from '../misc/help';

export default async function (interaction: any) {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.inCachedGuild()) return;

  const { commandName, options, user } = interaction;

  if (commandName === 'rank') {
    await interaction.deferReply();
    const specifiedUser = options.getUser('user') || user;
    const id = specifiedUser.id;
    const content = postRank(id, interaction.guildId!);
    const embed = new EmbedBuilder()
      .setTitle(`Alt Text Leaderboards`)
      .setDescription(content)
      .setColor(0xd797ff);

    await interaction.editReply({ embeds: [embed], allowedMentions: generateAllowedMentions() });
    return;
  }

  if (commandName === 'leaderboard') {
    await interaction.deferReply();

    const page = options.getNumber('page')?.valueOf() ?? 1;

    const content = postLeaderboard(interaction.guildId!, page);
    const embed = new EmbedBuilder()
      .setTitle(`Alt Text Leaderboards${page !== 1 ? ' (Page ' + page + ')' : ''}`)
      .setDescription(content.text)
      .setFooter({ text: content.footer })
      .setColor(0xd797ff);

    await interaction.editReply({ embeds: [embed], allowedMentions: generateAllowedMentions() });
    return;
  }

  if (commandName === 'loserboard') {
    await interaction.deferReply();

    const page = options.getNumber('page')?.valueOf() ?? 1;
    const content = await postLoserboard(interaction.guildId!, page);
    const embed = new EmbedBuilder()
      .setTitle(`Loserboard${page !== 1 ? ' (Page ' + page + ')' : ''}`)
      .setDescription(content)
      .setColor(0xd797ff);

    await interaction.editReply({ embeds: [embed], allowedMentions: generateAllowedMentions() });
    return;
  }

  if (commandName === 'set') {
    await interaction.deferReply();

    const { options, member } = interaction;
    let rm = (member!.roles as GuildMemberRoleManager).cache;
    if (rm.has(leaderboards.Configuration[interaction.guildId!].modRole)) {
      const specifiedUser = options.getUser('user')!;
      const specifiedBoard = options.getString('board')!.valueOf();
      const specifiedOperation = options.getString('operation')?.valueOf() ?? 'Absolute';
      const specifiedValue = Math.max(0, options.getNumber('value')!.valueOf())

      const ref = db.ref(`/Leaderboard/${specifiedBoard!}/${interaction.guildId}`).child(specifiedUser.id);
      const originalValue = (await ref.get()).val();
      if (specifiedOperation == 'Add') {
        ref.set(ServerValue.increment(specifiedValue));
      }
      else if (specifiedOperation == 'Subtract') {
        ref.set(ServerValue.increment(-specifiedValue));
      }
      else if (specifiedOperation == 'Absolute') {
        ref.set(specifiedValue);
      }

      const embed = new EmbedBuilder()
        .setTitle(`Leaderboard Override`)
        .setDescription(`Set <@${specifiedUser!.id}>'s **${specifiedBoard!}** value from \`${originalValue!}\` to \`${(await ref.get()).val()!}\`.`)

        .setColor(0xd797ff);
      await interaction.editReply({ embeds: [embed], allowedMentions: generateAllowedMentions() });
      return;
    } else {
      // User does NOT have the 'Staff' role
      const embed = new EmbedBuilder()
        .setTitle(`Leaderboard Override`)
        .setDescription(`Unfortunately, you do not have sufficient permission to perform this action.`)
        .setColor(0xd797ff);
      await interaction.editReply({ embeds: [embed], allowedMentions: generateAllowedMentions() });
      return;
    }
  }

  if (commandName === 'usersetting') {
    await interaction.deferReply();

    const { options, user } = interaction;
    const specifiedSetting = options.getString('setting')!.valueOf();
    const specifiedOption = options.getString('option')!.valueOf() == 'YES'

    let ref;
    switch (specifiedSetting) {
      case 'Reminder':
        ref = db.ref(`/UserSettings/${user.id}`).child('Reminder');
        ref.set(specifiedOption);
        break;
      case 'ActivationFailure':
        ref = db.ref(`/UserSettings/${user.id}`).child('ActivationFailure');
        ref.set(specifiedOption);
          break;
      default:
        break;
    }

    const embed = new EmbedBuilder()
      .setTitle(`AltBot User Settings`)
      .setDescription(`Set ${specifiedSetting} to ${specifiedOption}.`)
      .setColor(0xd797ff);
    await interaction.editReply({ embeds: [embed], allowedMentions: generateAllowedMentions() });
    return;
  }

  if (commandName === 'help') {
    const row = new ActionRowBuilder()
			.addComponents(HelpSelections);

		const response = await interaction.reply({
      content: "Please make a selection:",
			components: [row],
    });

    try {
      const confirmation = await response.awaitMessageComponent({ time: 60_000 });
      const selection: string = confirmation.values[0] ?? 'error';
      await confirmation.update({ content: "", embeds: [HelpEmbedMap[selection]], components: [] })
    } catch (e) {
      await interaction.deleteReply();
    }
  }

  if (commandName === 'why') {
    const embed = new EmbedBuilder()
      .setTitle(`Why Use Alt Text?`)
      .setDescription(whyText)
      .setURL(`https://moz.com/learn/seo/alt-text`)
      .setColor(0xd797ff);

    await interaction.reply({ embeds: [embed], allowedMentions: generateAllowedMentions() });
    return;
  }

  if (commandName === 'altrules') {
    let serverValue = leaderboards.Configuration[interaction.guildId!].altrules;
    serverValue = serverValue.replaceAll('\\n', '\n');
    if (serverValue == 'default') serverValue = "This server has not specified any alt text rules.";
    const embed = new EmbedBuilder()
      .setTitle(`Alt Text Rules for '${interaction.guild!.name}'`)
      .setDescription(serverValue)
      .setColor(0xd797ff);

    await interaction.reply({ embeds: [embed], allowedMentions: generateAllowedMentions() });
    return;
  }

  if (commandName === 'about') {
    const embed = new EmbedBuilder()
      .setTitle(`AltBot Accessibility Bot`)
      .setDescription(`Version: ${VERSION}\nAuthor: <@177227281129930752>`)
      .setURL(`https://github.com/abredall/AltBot`)
      .setColor(0xd797ff);
    await interaction.reply({ embeds: [embed], allowedMentions: generateAllowedMentions() });
    return;
  }
};
