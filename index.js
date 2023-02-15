require('dotenv').config();
const { REST, Routes } = require('discord.js');
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const schedule = require('node-schedule');

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

const channel_staff_announce = process.env.CHANNEL_STAFF_ANNOUNCE;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const ruleTest = new schedule.RecurrenceRule();
    ruleTest.minute=[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const jobTest = schedule.scheduleJob(ruleTest, function() {
        console.log('AYY LMAO');
        client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a** <@&${process.env.STAFF_ROLE_ID}>**-wide meeting Saturday at 5pm EST / 10pm BST! If you haven't already, make sure you have enabled and double checked notifications for each relevant recurring meeting in Google Calendar:** <https://calendar.google.com>`).catch('error', (error) => {console.log(error.message)});
    });

    const ruleTest2 = new schedule.RecurrenceRule();
    ruleTest2.second=[0, 30];
    const jobTest2 = schedule.scheduleJob(ruleTest2, function() {
        console.log('AYY LMAO SEC');
        client.channels.cache.get(channel_staff_announce).send(`second reminder`).catch('error', (error) => {console.log(error.message)});
    });
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
  }
});

client.login(TOKEN);