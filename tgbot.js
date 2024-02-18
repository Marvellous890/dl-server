import TelegramBot from 'node-telegram-bot-api';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// replace the value below with the Telegram token you receive from @BotFather
const token = '6461978042:AAFz80sAF0w2Fs6VB7zB0mE6gLwoU_Eket4';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true, baseApiUrl: "http://209.97.184.9:8081"});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
/*
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
*/

// send file
bot.onText(/\/sendfile/, (msg, match) => {
  const chatId = msg.chat.id;

  const fileName = 'Figma UI UX Design Advanced.rar';
  const filePath = __dirname + '/dlfiles';
  const partFiles = readdirSync(filePath).filter(file => file.startsWith(`${fileName}.part`));
  
  partFiles.forEach((partFile, index) => {
    const partFilePath = filePath + '/' + partFile;

    bot.sendDocument(chatId, partFilePath);
  });
});