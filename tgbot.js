import TelegramBot from 'node-telegram-bot-api';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { log } from 'console';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// replace the value below with the Telegram token you receive from @BotFather
const token = '6479373490:AAHiLW0Y35GiCAngB4D98ylEh1tpzOyLyj0';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true, baseApiUrl: "http://104.248.120.99:8081"});

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

  // sending single file
  // bot.sendDocument(chatId, 'dlfiles/FrontendMasters - Svelte & SvelteKit.part2.rar');


  // sendind part files created with CodeyFJ
  const fileName = 'Milan Jovanovic - Modular Monolith Architecture.zip.002';
  const filePath = __dirname + '/dlfiles';
  const partFiles = readdirSync(filePath).filter(file => file.startsWith(`${fileName}.part`));
  
  partFiles.forEach((partFile, index) => {
    const partFilePath = filePath + '/' + partFile;

    bot.sendDocument(chatId, partFilePath);
  });


  // loop through dlfiles folder and send all files
  // const filePath = __dirname + '/dlfiles';
  // const files = readdirSync(filePath);
  // files.forEach((file, index) => {
  //   const eachFilePath = filePath + '/' + file;

  //   // bot.sendDocument(chatId, eachFilePath);
  // });


  // loop through dlfiles folder and send all files per minute
  // const filePath = __dirname + '/dlfiles';
  // const files = readdirSync(filePath);
  // let index = 0;
  // const interval = setInterval(() => {
  //   if (index < files.length) {
  //     const eachFilePath = filePath + '/' + files[index];
  //     bot.sendDocument(chatId, eachFilePath);
  //     index++;
  //   } else {
  //     clearInterval(interval);
  //   }
  // }, 60000);

});