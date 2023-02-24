// ----------------------Imports-----------------------------
import { Snake } from "tgsnake";
import * as dotenv from "dotenv";

// ----------------------Init-----------------------------
dotenv.config();

const bot = new Snake({
  apiId: process.env.API,
  apiHash: process.env.HASH,
  session: process.env.SESSION,
  storeSession: false,
});

try {
  bot.run();
} catch (err) {
  console.log(
    "Error: clear the file cache.json and paste [] – and check your code for errors."
  );
}

// ----------------------Commands-----------------------------
bot.command("start", async (ctx) => {
  await ctx.reply("Bot started");
});

bot.command("banall", async (ctx) => {
  let success = 0;
  let fail = 0;

  const results = await ctx.telegram.getParticipants(ctx.chat.id);

  for (const i in results["participants"]) {
    try {
      await ctx.telegram.banChatMember(
        ctx.chat.id,
        results["participants"][i]["user"]["id"]
      );
      success++;
    } catch (error) {
      fail++;
      console.log(error);
    }
  }
  await ctx.reply(`Successfully Banned: ${success} users\nFailed: ${fail}`);
});

// ---------------------------------------------------
