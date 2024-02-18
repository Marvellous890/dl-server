import TelegramBot from 'node-telegram-bot-api';

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
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

// send file
bot.onText(/\/sendfile/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendDocument(chatId, 'dlfiles/Next Level CSS Creative Hover & Animation Effects Updated 5-2022 [1080P].part2.rar');
});