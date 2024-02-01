const shortHelpBase = "- **REPLY to your message with `r! (image description)` to add alt text.**\n- Use the pipe character `|` for multiple images.";

// STRINGS
export const whyText = `Alternative Text (alt text) is a text description of an image that is generally read by a screen reader to allow blind and low vision users to understand the context of an image. It can also benefit users who prefer multiple ways to process content.\n\nAdditionally, alt text is beneficial even outside the realm of accessibility—on Discord, alt text is indexed and searchable, allowing you to search for images quickly and easily!`;

export const hintText = "Hi, it looks like you might be new to adding alt text with AltBot.\n" + shortHelpBase + "\nFor more details, `/help`. For why, `/why`.\n**To see this server's alt text rules, `/altrules`.**\nIf you would like to be reminded on AltBot usage in the future, `/usersetting Reminder YES`.";

export const reminderText = "Hi, you asked me to remind you on AltBot usage—Here's a TL;DR:\n" + shortHelpBase;

export const urlWarning = "Hi! You appear to have linked to an image.\nLinking to images is convenient, but comes at the expense of accessibility as they cannot have alt text.\n**Please consider reposting your image as a direct embed so alt text can be added!**\n_If you believe this reply was sent in error, please notify <@177227281129930752>._";

export const expiry = (dialogue: string, seconds: number) => {
  let currentTime = Math.round(Date.now() / 1000);
  let goal = currentTime + seconds;

  return dialogue + `\n\n_This message will self-destruct <t:${goal}:R>._`;
};
