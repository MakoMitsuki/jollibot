require('dotenv').config();
const { REST, Routes } = require('discord.js');
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const schedule = require('node-schedule');
const gposersSchedule = require('./gposers-schedule');

const rest = new REST({ version: '10' }).setToken(TOKEN);
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    try {
        gposersSchedule.test(client, schedule)
    } catch (error) {
        console.log(error);
    }
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
  }
});

client.login(TOKEN);