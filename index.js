require('dotenv').config();
const { REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const schedule = require('node-schedule');

const rest = new REST({ version: '10' }).setToken(TOKEN);
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

/* ================================= SCHEDULE START ================================= */

const channel_collaborators = process.env.CHANNEL_COLLABORATORS;
const channel_staff_announce = process.env.CHANNEL_STAFF_ANNOUNCE;
const channels_weekly_feature = process.env.CHANNEL_WEEKLY_FEATURE;
const channels_community_couture = process.env.CHANNEL_COMMUNITY_COUTURE;

const staffDiscordId = process.env.STAFF_DISCORD_ID;

const yuliaPing = process.env.YULIA;
const edeonPing = process.env.EDEON;
const staffEditorRole = process.env.STAFF_EDITOR_ROLE;
const ricardoRole = process.env.STAFF_RICARDO_ROLE;

const staffPing = process.env.STAFF_PING;
const hiatusPing = process.env.HIATUS_PING;
const designerPing = process.env.DESIGNER;
const glamArtistPing = process.env.GLAM_ARTIST;
const artistPing = process.env.ARTIST;
const authorPing = process.env.AUTHOR;
const photographerPing = process.env.PHOTOGRAPHER;
const proofreaderPing = process.env.PROOFREADER;

const second_thurs_dates = [6, 7, 8, 9, 10, 11, 12];
const second_sat_dates = [8, 9, 10, 11, 12, 13, 14];
const months = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11];

// WEEKLY FEATURE OPEN
schedule.scheduleJob({hour: 12, minute: 0, dayOfWeek: 0}, function(){
  client.channels.cache.get(channels_weekly_feature).send(`**[Submissions for the Weekly Feature are now OPEN!]**`).catch(console.error);
});

// WEEKLY FEATURE CLOSE
schedule.scheduleJob({hour: 12, minute: 0, dayOfWeek: 5}, function(){
  client.channels.cache.get(channels_weekly_feature).send(`**[CLOSED!]**`).catch(console.error);
  //console.log(`Weekly Feature closed.`);
});

// COMMUNITY COLLECTION OPEN
schedule.scheduleJob({date: 28, hour: 12, minute: 0}, function(){
  client.channels.cache.get(channels_community_couture).send(`**[Submissions for the Community Collection are now OPEN!]**`).catch(console.error);
  //console.log(`Community Collection opened.`);
});

// COMMUNITY COLLECTION CLOSE
schedule.scheduleJob({date: 14, hour: 0, minute: 0}, function(){
  client.channels.cache.get(channels_community_couture).send(`**[CLOSED!]**`).catch(console.error);
  //console.log(`Community Collection closed.`);
});

var rule_second_notif_preday = new schedule.RecurrenceRule();
  rule_second_notif_preday.tz= 'America/New_York';
	rule_second_notif_preday.month = months;
	rule_second_notif_preday.date = second_thurs_dates;
	rule_second_notif_preday.dayOfWeek = 4;
	rule_second_notif_preday.hour = 12;
	rule_second_notif_preday.minute = 0;
	rule_second_notif_preday.second = 0;
var staff_meeting_second_notif_preday = schedule.scheduleJob(rule_second_notif_preday, function(){
    client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a** <@&${staffPing}>/<@&${hiatusPing}>**-wide jolli-meeting Saturday at 5pm Eastern!`).catch(console.error);
    //console.log(`1st Monthly Staff Meeting Announced Day Prior.`);
});

var rule_second_notif_day = new schedule.RecurrenceRule();
  rule_second_notif_day.tz= 'America/New_York';
	rule_second_notif_day.month = months;
	rule_second_notif_day.date = second_sat_dates;
	rule_second_notif_day.dayOfWeek = 6;
	rule_second_notif_day.hour = 12;
	rule_second_notif_day.minute = 0;
	rule_second_notif_day.second = 0;
var staff_meeting_second_notif_day = schedule.scheduleJob(rule_second_notif_day, function(){
    client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a** <@&${staffPing}>/<@&${hiatusPing}>**-wide jolli-meeting today at 5pm Eastern!`).catch(console.error);
    //console.log(`1st Monthly Staff Meeting Announced Day Of.`);
});

var rule_second_notif_hour = new schedule.RecurrenceRule();
  rule_second_notif_hour.tz= 'America/New_York';
	rule_second_notif_hour.month = months;
	rule_second_notif_hour.date = second_sat_dates;
	rule_second_notif_hour.dayOfWeek = 6;
	rule_second_notif_hour.hour = 16;
	rule_second_notif_hour.minute = 0;
	rule_second_notif_hour.second = 0;
var staff_meeting_second_notif_hour = schedule.scheduleJob(rule_second_notif_hour, function(){
    client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a** <@&${staffPing}>/<@&${hiatusPing}>**-wide jolli-meeting today in one hour!`).catch(console.error);
    //console.log(`1st Monthly Staff Meeting Announced Hour Before.`);
});

var rule_second_notif_start = new schedule.RecurrenceRule();
  rule_second_notif_start.tz = 'America/New_York';
	rule_second_notif_start.month = months;
	rule_second_notif_start.date = second_sat_dates;
	rule_second_notif_start.dayOfWeek = 6;
	rule_second_notif_start.hour = 17;
	rule_second_notif_start.minute = 0;
	rule_second_notif_start.second = 0;
	var staff_meeting_second_start = schedule.scheduleJob(rule_second_notif_start, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${staffPing}>/<@&${hiatusPing}>**-wide jolli-meeting is starting now!`).catch(console.error);
		//console.log(`1st Monthly Staff Meeting Announced.`);
	});


var rule_design_first_notif = new schedule.RecurrenceRule();
  rule_design_first_notif.tz = 'America/New_York';
	rule_design_first_notif.month = months;
	rule_design_first_notif.date = 1;
	rule_design_first_notif.hour = 0;
	rule_design_first_notif.minute = 0;
	rule_design_first_notif.second = 0;
	var design_first_notif = schedule.scheduleJob(rule_design_first_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> Today is the 1st. **The limit on picking up articles has now been removed for the month.**`).catch(console.error);
		//console.log(`Designer 1st Notification Announced.`);
	});
var rule_glam_soft_notif = new schedule.RecurrenceRule();
  rule_glam_soft_notif.tz = 'America/New_York';
	rule_glam_soft_notif.month = months;
	rule_glam_soft_notif.date = 3;
	rule_glam_soft_notif.hour = 12;
	rule_glam_soft_notif.minute = 0;
	rule_glam_soft_notif.second = 0;
	var glam_soft_notif = schedule.scheduleJob(rule_glam_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${glamArtistPing}> **soft deadline is today**. Make sure you have submitted at least a rough draft of your work by the end of the day.`).catch(console.error);
		//console.log(`Glam Artists Soft Deadline Announced.`);
	});
var rule_artist_soft_notif = new schedule.RecurrenceRule();
  rule_artist_soft_notif.tz = 'America/New_York';
	rule_artist_soft_notif.month = months;
	rule_artist_soft_notif.date = 10;
	rule_artist_soft_notif.hour = 12;
	rule_artist_soft_notif.minute = 1;
	rule_artist_soft_notif.second = 0;
	var artist_soft_notif = schedule.scheduleJob(rule_artist_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${artistPing}> **soft deadline for all magazine-related artwork is today**. Make sure you have started all artwork before the end of the day.`).catch(console.error);
		//console.log(`Artists Soft Deadline Announced.`);
	});
var rule_artist_hard_notif = new schedule.RecurrenceRule();
  rule_artist_hard_notif.tz = 'America/New_York';
	rule_artist_hard_notif.month = months;
	rule_artist_hard_notif.date = 13;
	rule_artist_hard_notif.hour = 12;
	rule_artist_hard_notif.minute = 2;
	rule_artist_hard_notif.second = 0;
	var artist_hard_notif = schedule.scheduleJob(rule_artist_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${artistPing}> **hard deadline for all magazine-related artwork is today**. Make sure you have submitted all artwork by the end of the day.`).catch(console.error);
		//console.log(`Artists Hard Deadline Announced.`);
	});
var rule_auth_soft_glam_hard_notif = new schedule.RecurrenceRule();
  rule_auth_soft_glam_hard_notif.tz = 'America/New_York';
	rule_auth_soft_glam_hard_notif.month = months;
	rule_auth_soft_glam_hard_notif.date = 5;
	rule_auth_soft_glam_hard_notif.hour = 12;
	rule_auth_soft_glam_hard_notif.minute = 0;
	rule_auth_soft_glam_hard_notif.second = 0;
	var auth_soft_glam_hard_notif = schedule.scheduleJob(rule_auth_soft_glam_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${authorPing}> **soft deadline is today**. Make sure you have submitted at least a rough draft of your work by the end of the day.\n\n<@&${glamArtistPing}> **hard deadline is today**. Make sure you have submitted your completed works by the end of the day.`).catch(console.error);
		//console.log(`Authors Soft Deadline Announced. Glam Artists Hard Deadline Announced.`);
	});
var rule_auth_hard_notif = new schedule.RecurrenceRule();
  rule_auth_hard_notif.tz = 'America/New_York';
	rule_auth_hard_notif.month = months;
	rule_auth_hard_notif.date = 11;
	rule_auth_hard_notif.hour = 12;
	rule_auth_hard_notif.minute = 0;
	rule_auth_hard_notif.second = 0;
	var auth_hard_notif = schedule.scheduleJob(rule_auth_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${authorPing}> **hard deadline is today**. Make sure you have submitted your completed works by the end of the day.`).catch(console.error);
		//console.log(`Authors Hard Deadline Announced.`);
	});
var rule_photo_cc_soft_notif = new schedule.RecurrenceRule();
  rule_photo_cc_soft_notif.tz = 'America/New_York';
	rule_photo_cc_soft_notif.month = months;
	rule_photo_cc_soft_notif.date = 7;
	rule_photo_cc_soft_notif.hour = 12;
	rule_photo_cc_soft_notif.minute = 0;
	rule_photo_cc_soft_notif.second = 0;
	var photo_cc_soft_notif = schedule.scheduleJob(rule_photo_cc_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **soft deadline for internal Community Couture articles is today**. Make sure you have started all internal Community Couture photography work before the end of the day.`).catch(console.error);
		//console.log(`Photographers CC Soft Deadline Announced.`);
	});
var rule_photo_soft_notif = new schedule.RecurrenceRule();
  rule_photo_soft_notif.tz = 'America/New_York';
	rule_photo_soft_notif.month = months;
	rule_photo_soft_notif.date = 10;
	rule_photo_soft_notif.hour = 12;
	rule_photo_soft_notif.minute = 0;
	rule_photo_soft_notif.second = 0;
	var photo_soft_notif = schedule.scheduleJob(rule_photo_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **soft deadline for all non-Community Couture articles is today**. Make sure you have started all photography work before the end of the day.\n\n<@&${photographerPing}> **hard deadline for internal Community Couture articles is today**. Make sure you have submitted all photography work for internal Community Couture articles by the end of the day.`).catch(console.error);
		//console.log(`Photographers Soft Deadline Announced.`);
	});

var rule_photo_hard_notif = new schedule.RecurrenceRule();
  rule_photo_hard_notif.tz = 'America/New_York';
	rule_photo_hard_notif.month = months;
	rule_photo_hard_notif.date = 13;
	rule_photo_hard_notif.hour = 12;
	rule_photo_hard_notif.minute = 0;
	rule_photo_hard_notif.second = 0;
	var photo_hard_notif = schedule.scheduleJob(rule_photo_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **hard deadline for all articles is today**. Make sure you have submitted all photography work by the end of the day.`).catch(console.error);
		//console.log(`Photographers Hard Deadline Announced.`);
	});

var rule_proof_hard_notif = new schedule.RecurrenceRule();
  rule_proof_hard_notif.tz = 'America/New_York';
	rule_proof_hard_notif.month = months;
	rule_proof_hard_notif.date = 13;
	rule_proof_hard_notif.hour = 12;
	rule_proof_hard_notif.minute = 1;
	rule_proof_hard_notif.second = 0;
	var proof_hard_notif = schedule.scheduleJob(rule_proof_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${proofreaderPing}> **hard deadline is today**. Make sure you have finished proofreading all articles by the end of the day.`).catch(console.error);
		//console.log(`Proofreaders Hard Deadline Announced.`);
	});

var rule_design_soft_notif = new schedule.RecurrenceRule();
  rule_design_soft_notif.tz = 'America/New_York';
	rule_design_soft_notif.month = months;
	rule_design_soft_notif.date = 19;
	rule_design_soft_notif.hour = 12;
	rule_design_soft_notif.minute = 0;
	rule_design_soft_notif.second = 0;
	var design_soft_notif = schedule.scheduleJob(rule_design_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **soft deadline is today**. Make sure you have submitted at least a rough draft or example of your designs by the end of the day.`).catch(console.error);
		//console.log(`Designers Soft Deadline Announced.`);
	});
var rule_design_hard_notif = new schedule.RecurrenceRule();
  rule_design_hard_notif.tz = 'America/New_York';
	rule_design_hard_notif.month = months;
	rule_design_hard_notif.date = 22;
	rule_design_hard_notif.hour = 12;
	rule_design_hard_notif.minute = 0;
	rule_design_hard_notif.second = 0;
	var design_hard_notif = schedule.scheduleJob(rule_design_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **hard deadline is today**. Make sure you have submitted your completed designs by the end of the day.`).catch(console.error);
		//console.log(`Designers Hard Deadline Announced.`);
	});

// EORZEA COLLECTION PING EDEON
var rule_eorzea_collection_notif = new schedule.RecurrenceRule();
  rule_eorzea_collection_notif.tz = 'America/New_York';
	rule_eorzea_collection_notif.month = months;
	rule_eorzea_collection_notif.date = 1;
	rule_eorzea_collection_notif.hour = 12;
	rule_eorzea_collection_notif.minute = 0;
	rule_eorzea_collection_notif.second = 0;
	var eorzea_collection_notif = schedule.scheduleJob(rule_eorzea_collection_notif, function(){
		client.channels.cache.get(channel_collaborators).send(`<@${edeonPing}> **It is time to renew the blood pact.**`).catch(console.error);
		//console.log(`Eorzea Collection ping sent.`);
	});

/* ================================= SCHEDULE END =================================== */

const pauseStaffReminders = (interaction) => {
  try {
    // skip next month's meeting reminders
    staff_meeting_second_notif_preday.cancelNext(true);
    staff_meeting_second_notif_day.cancelNext(true);
    staff_meeting_second_notif_hour.cancelNext(true);
    staff_meeting_second_start.cancelNext(true);

    // skip next month's magazine deadline reminders
    design_first_notif.cancelNext(true);
    glam_soft_notif.cancelNext(true);
    artist_soft_notif.cancelNext(true);
    artist_hard_notif.cancelNext(true);
    auth_soft_glam_hard_notif.cancelNext(true);
    auth_hard_notif.cancelNext(true);
    photo_cc_soft_notif.cancelNext(true);
    photo_soft_notif.cancelNext(true);
    photo_hard_notif.cancelNext(true);
    proof_hard_notif.cancelNext(true);
    design_soft_notif.cancelNext(true);
    design_hard_notif.cancelNext(true);
    
    // TODO: client log success
    interaction.reply(`**Break month commenced!** All magazine deadlines have been paused until this time next month. Enoy the jolli-day!`);
  }
  catch (error) {
    // TODO: client log error
    interaction.reply(`**ERROR:** Something went jolli-wrong when scheduling the break month! <@${yuliaPing} pls fix.>`);
    console.log(`[[BREAKMONTH]] ${error}`);
    return;
  }
}

const commands = [
    {
      name: 'urmom',
      description: 'Replies with gay.',
    },
	{
		name: 'jollidance',
		description: 'I will Jollidance for you.'
	},
    {
      name: 'breakmonth',
      description: '[ADMIN ONLY FUNCTION] Pause all GPOSERS Staff notifications (only includes staff deadlines and meetings) starting now until the next month. Note that this should ideally be done on the 28th before the break month.',
    }, 
	{
		name: 'when-meeting',
		description: '[STAFF DISCORD ONLY] Lets you know when your next staff meeting is.'
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

});

client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

    if (interaction.commandName === 'urmom') {
        await interaction.reply('gay');
    }
    
    if (interaction.commandName === 'breakmonth') {
		// EDITOR ONLY
		if (interaction.member.roles.includes(staffEditorRole) || interaction.member.roles.includes(ricardoRole)) {
			// BREAK MONTH
			const isBreakMonth_row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('yesbreakbutton')
					.setLabel(`Yes, It's break time baybee!`)
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('nobreakbutton')
					.setLabel(`Never Mind...`)
					.setStyle(ButtonStyle.Danger),
				);

			await interaction.reply({ content: `**Are you jolli-sure you want to set the break month?** Once it is set, it cannot be unset until it auto-unsets itself month from now OR asking Yulia to reset the bot.`, 
			components: [isBreakMonth_row], ephemeral: true, });
			// BUTTONS PARSED IN BUTTON INTERACTIONS
		} else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to set the break month!`);
		}
    }

	if (interaction.commandName === 'when-meeting') {
		if (interaction.guildId === staffDiscordId ) {
			const nextMeeting = staff_meeting_second_start.nextInvocation();

			await interaction.reply(`Your next scheduled jolli-meeting is at **${nextMeeting?.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}**`)
		}
		else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to see that!`);
		}
	}

	if (interaction.commandName === 'jollidance') {
		await interaction.reply(`https://tenor.com/view/jollibee-chicken-joy-gif-26175242`);
	}

    if (interaction.isButton()) {
      // BUTTON COMMANDS
      if (interaction.customId === 'yesbreakbutton') {
		// PAUSE ALL NOTIFS
		await pauseStaffReminders(interaction);
      } 
	  else if (interaction.customId === 'nobreakbutton') {
		// DONT CANCEL ALL NOTIFS
		await interaction.reply(`Gotcha! No break for now.`);
	  } else {
		return;
	  }
    }

});

client.login(TOKEN);