import React from 'react';
import { UrbanBotTelegram } from '@urban-bot/telegram';
import { render, Root } from '@urban-bot/core';
import dotenv from 'dotenv';
import { App } from '../App';
import { HttpClient } from '../httpclient/implementation';

dotenv.config();

const { TELEGRAM_TOKEN, PORT} = process.env;
//const BOT_PORT = PORT; //Heroku to automatically set PORT
const BOT_PORT = process.env.BOT_PORT || PORT; //to manually set config PORT

const isDevelopment = process.env.NODE_ENV === 'development';

if (!TELEGRAM_TOKEN) {
    throw new Error('Provide TELEGRAM_TOKEN to .env https://core.telegram.org/bots#6-botfather');
}

const urbanBotTelegram = new UrbanBotTelegram({
    token: TELEGRAM_TOKEN,
    isPolling: isDevelopment,
});

render(
  <Root bot={urbanBotTelegram} port={BOT_PORT ? Number(BOT_PORT) : undefined}>
    <App />
  </Root>,

  () => {
      console.log("Check whether Telegram Bot Token is already configured in Heroku...\n");
      if (TELEGRAM_TOKEN) {
          console.log("Telegram Bot Token is configured.");
      }
      console.log('Telegram bot has started on PORT ' +  Number(BOT_PORT))}

);
