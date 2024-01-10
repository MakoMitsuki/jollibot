require('dotenv').config();
const { REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const schedule = require('node-schedule');
const fetch = require('node-fetch');

const rest = new REST({ version: '10' }).setToken(TOKEN);
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

const tenorAPI = process.env.TENOR_API_KEY;

/* ================================= SCHEDULE START ================================= */

const channel_collaborators = process.env.CHANNEL_COLLABORATORS;
const channel_staff_announce = process.env.CHANNEL_STAFF_ANNOUNCE;
const channels_weekly_feature = process.env.CHANNEL_WEEKLY_FEATURE;
const channels_community_collection = process.env.CHANNEL_COMMUNITY_COLLECTION;
const channels_gotm = process.env.CHANNEL_GLAM_OF_THE_MONTH;

const staffDiscordId = process.env.STAFF_DISCORD_ID;
const testDiscordId = process.env.ROBOT_YULIA_SERVER_ID;

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
const qaPing = process.env.QA;

const contestAlertsPing = process.env.CONTEST_ALERTS_PING;

const second_thurs_dates = [6, 7, 8, 9, 10, 11, 12];
const second_sat_dates = [8, 9, 10, 11, 12, 13, 14];
const months = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
const monthsNov = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10];
const monthsDec = [0, 1, 2, 3, 4, 5, 7, 8, 9, 11];

const hammerTimeHelper = (d, format) => {
	try {
		const epoch = parseInt(d.getTime() / 1000);
		return `<t:${epoch}:${format}>`;
	} catch (error) {
		console.log(`[[HAMMERTIME HELPER ERROR - d = ${d} // format = ${format}]] ${error}`);
		return d;
	}
}

const getMidnightSameDay = (d, format) => {
	try {
		const newDTime = new Date(d.getFullYear(), d.getMonth(), (d.getDate() + 1), 4, 59);
		const epoch = parseInt(newDTime.getTime()/1000);
		return `<t:${epoch}:${format}>`;
	}catch (error) {
		console.log(`[[GET MIDNIGHT SAME DAY ERROR - d = ${d} // format = ${format}]] ${error}`);
		return d;
	}
}

// WEEKLY FEATURE OPEN
schedule.scheduleJob({hour: 12, minute: 0, dayOfWeek: 0, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_weekly_feature).send(`<@&${contestAlertsPing}> **[Submissions for the Weekly Feature are now OPEN!]**`).catch(console.error);
});

// WEEKLY FEATURE CLOSE
schedule.scheduleJob({hour: 12, minute: 0, dayOfWeek: 5, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_weekly_feature).send(`<@&${contestAlertsPing}> **[WEEKLY FEATURE SUBMISSIONS ARE NOW CLOSED!]**`).catch(console.error);
  //console.log(`Weekly Feature closed.`);
});

// COMMUNITY COLLECTION OPEN
const ccol_embed = {
	"title": `Community Collection submissions for the next issue is now open!`,
	"description": `Submit **up to two of your best screenshots** to be featured in the magazine. Remember that **mods/custom poses/NSFW are NOT allowed** to be submitted here.`,
	"color": 0x005f73
  }

var ccolopen = schedule.scheduleJob({date: 28, hour: 12, minute: 30, tz: 'America/New_York'}, function(){
  //client.channels.cache.get(channels_community_collection).send(`<@&${contestAlertsPing}> **[Submissions for the Community Collection are now OPEN!]**`).catch(console.error);
  client.channels.cache.get(channels_community_collection).send({content: `<@&${contestAlertsPing}>`,  embeds: [ccol_embed] }).catch(console.error); 
  //console.log(`Community Collection opened.`);
});

// COMMUNITY COLLECTION CLOSE
var ccolclose = schedule.scheduleJob({date: 14, hour: 0, minute: 30, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_community_collection).send(`<@&${contestAlertsPing}> **[COMMUNITY COLLECTION SUBMISSIONS ARE NOW CLOSED!]**`).catch(console.error);
  //console.log(`Community Collection closed.`);
});

// GLAM OF THE MONTH
const gotm_vote_embed = {
	"title": `Glam of the Month Voting Time!`,
	"description": ` Submissions for the next issue is now closed! Everyone choose ONE glamour you'd like to be featured in the magazine! Cast your vote by reacting :gposers1: under the glam.`,
	"color": 0x005f73
  }

var gotm_vote = schedule.scheduleJob({date: 10, hour: 9, minute: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channels_gotm).send({content: `<@&${contestAlertsPing}>`,  embeds: [gotm_vote_embed] }).catch(console.error);
	//console.log(`Community Collection closed.`);
  });

var gotm_close = schedule.scheduleJob({date: 10, hour: 12, minute: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channels_gotm).send(`<@&${contestAlertsPing}> **VOTING NOW CLOSED!** Tune in to the next issue for the winner's feature!`).catch(console.error);
	//console.log(`Community Collection closed.`);
  });

// GLAM OF THE MONTH OPEN
const gotm_open_embed = {
	"type": "rich",
	"title": `GPOSERS Glam of the Month submissions for the next issue is now open!`,
	"description": `Submit your best glamour for a chance to be featured in the magazine!\n\n[Read the rules before submitting.](https://discord.com/channels/465931452085829643/1185612785112060066/1187716569229447268)`,
	"color": 0x005f73,
	"fields": [
	  {
		"name": `Submission Template File`,
		"value": `https://docs.google.com/document/d/1ysb6zW4FzTWRnD2CIF3c-MScRwC2OmjNuHWnKzNuoM0/edit`
	  },
	  {
		"name": `Deadline of submissions`,
		"value": `${hammerTimeHelper(gotm_vote.nextInvocation(), 'F')} which is ${hammerTimeHelper(gotm_vote.nextInvocation(), 'R')} from now`
	  }
	]
  }

var gotm_open = schedule.scheduleJob({date: 28, hour: 12, minute: 0, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_gotm).send({content: `<@&${contestAlertsPing}>`,  embeds: [gotm_open_embed] }).catch(console.error); 
  //console.log(`Community Collection opened.`);
});

// ODD MONTHS
const oddMonths = [ 0, 2, 4, 6, 8, 10 ];
var staff_mtg_start_odd = schedule.scheduleJob({month: oddMonths, date: second_sat_dates, dayOfWeek: 6, hour: 17, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Our <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting is starting now!**\n\nhttps://media.tenor.com/c3pKaYLittEAAAAd/jollibee-chicken-joy.gif`).catch(console.error);
	//console.log(`Community Collection closed.`);
  });

var staff_mtg_2ndthurs_odd = schedule.scheduleJob({month: oddMonths, date: second_thurs_dates, dayOfWeek: 4, hour: 17, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(
		`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting this weekend:** ${hammerTimeHelper(staff_mtg_start_odd.nextInvocation(), 'F')} ${hammerTimeHelper(staff_mtg_start_odd.nextInvocation(), 'R')}`
		).catch(console.error);	
});

var staff_mtg_onDayEarly_odd = schedule.scheduleJob({month: oddMonths, date: second_sat_dates, dayOfWeek: 6, hour: 12, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting today!** It starts ${hammerTimeHelper(staff_mtg_start_odd.nextInvocation(), 'R')} at ${hammerTimeHelper(staff_mtg_start_odd.nextInvocation(), 'f')}`).catch(console.error);
});

var staff_mtg_onDayHour_odd = schedule.scheduleJob({month: oddMonths, date: second_sat_dates, dayOfWeek: 6, hour: 16, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting really soon! It's starting ${hammerTimeHelper(staff_mtg_start_odd.nextInvocation(), 'R')}!**`).catch(console.error);
});

// EVEN MONTHS
const evenMonths = [ 1, 3, 5, 7, 9, 11 ];
var staff_mtg_start_even = schedule.scheduleJob({month: evenMonths, date: second_sat_dates, dayOfWeek: 6, hour: 10, minute: 0, second: 0, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channel_staff_announce).send(`**Our <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting is starting now!**\n\nhttps://media.tenor.com/c3pKaYLittEAAAAd/jollibee-chicken-joy.gif`).catch(console.error);
  //console.log(`Community Collection closed.`);
});

var staff_mtg_2ndthurs_even = schedule.scheduleJob({month: evenMonths, date: second_thurs_dates, dayOfWeek: 4, hour: 10, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(
		`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting this weekend:** ${hammerTimeHelper(staff_mtg_start_even.nextInvocation(), 'F')} ${hammerTimeHelper(staff_mtg_start_even.nextInvocation(), 'R')}`
		).catch(console.error);	
});

var staff_mtg_onDayEarly_even = schedule.scheduleJob({month: evenMonths, date: second_sat_dates, dayOfWeek: 6, hour: 7, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting really soon!** It starts ${hammerTimeHelper(staff_mtg_start_even.nextInvocation(), 'R')} at ${hammerTimeHelper(staff_mtg_start_even.nextInvocation(), 'f')}`).catch(console.error);
});

var staff_mtg_onDayHour_even = schedule.scheduleJob({month: evenMonths, date: second_sat_dates, dayOfWeek: 6, hour: 9, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting really soon! It's starting ${hammerTimeHelper(staff_mtg_start_even.nextInvocation(), 'R')}!**`).catch(console.error);
});

// DESIGNER MEETINGS

const first_sat_dates = [1, 2, 3, 4, 5, 6, 7];

var designer_mtg_start = schedule.scheduleJob({month: monthsNov, date: first_sat_dates, dayOfWeek: 6, hour: 9, minute: 0, second: 0, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channel_staff_announce).send(`**Our <@&${designerPing}> jolli-meeting is starting now!**\n\nhttps://media.tenor.com/c3pKaYLittEAAAAd/jollibee-chicken-joy.gif`).catch(console.error);
  //console.log(`Designer Meeting ping`);
});

var designer_mtg_onDayEarly = schedule.scheduleJob({month: monthsNov, date: first_sat_dates, dayOfWeek: 6, hour: 0, minute: 30, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${designerPing}> jolli-meeting soon!** It starts ${hammerTimeHelper(designer_mtg_start.nextInvocation(), 'R')} at ${hammerTimeHelper(staff_mtg_start.nextInvocation(), 'f')}`).catch(console.error);
});

var designer_mtg_onDayHour = schedule.scheduleJob({month: monthsNov, date: first_sat_dates, dayOfWeek: 6, hour: 8, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${designerPing}> jolli-meeting really soon! It's starting ${hammerTimeHelper(design_mtg_start.nextInvocation(), 'R')}!**`).catch(console.error);
});

// ===============================================================

var rule_design_first_notif = new schedule.RecurrenceRule();
  rule_design_first_notif.tz = 'America/New_York';
	rule_design_first_notif.month = monthsNov;
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
	rule_glam_soft_notif.month = monthsNov;
	rule_glam_soft_notif.date = 3;
	rule_glam_soft_notif.hour = 12;
	rule_glam_soft_notif.minute = 0;
	rule_glam_soft_notif.second = 0;
	var glam_soft_notif = schedule.scheduleJob(rule_glam_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${glamArtistPing}> **soft jolli-deadline is today**. Make sure you have submitted at least a rough draft of your work by the end of the day.`).catch(console.error);
		//console.log(`Glam Artists Soft Deadline Announced.`);
	});
var rule_artist_soft_notif = new schedule.RecurrenceRule();
  rule_artist_soft_notif.tz = 'America/New_York';
	rule_artist_soft_notif.month = monthsNov;
	rule_artist_soft_notif.date = 10;
	rule_artist_soft_notif.hour = 12;
	rule_artist_soft_notif.minute = 1;
	rule_artist_soft_notif.second = 0;
	var artist_soft_notif = schedule.scheduleJob(rule_artist_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${artistPing}> **soft jolli-deadline for all magazine-related artwork is today**. Make sure you have started all artwork before the end of the day.`).catch(console.error);
		//console.log(`Artists Soft Deadline Announced.`);
	});
var rule_artist_hard_notif = new schedule.RecurrenceRule();
  rule_artist_hard_notif.tz = 'America/New_York';
	rule_artist_hard_notif.month = monthsNov;
	rule_artist_hard_notif.date = 13;
	rule_artist_hard_notif.hour = 12;
	rule_artist_hard_notif.minute = 2;
	rule_artist_hard_notif.second = 0;
	var artist_hard_notif = schedule.scheduleJob(rule_artist_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${artistPing}> **hard jolli-deadline for all magazine-related artwork is today**. Make sure you have submitted all artwork by the end of the day.`).catch(console.error);
		//console.log(`Artists Hard Deadline Announced.`);
	});
var rule_auth_soft_glam_hard_notif = new schedule.RecurrenceRule();
  rule_auth_soft_glam_hard_notif.tz = 'America/New_York';
	rule_auth_soft_glam_hard_notif.month = monthsNov;
	rule_auth_soft_glam_hard_notif.date = 5;
	rule_auth_soft_glam_hard_notif.hour = 12;
	rule_auth_soft_glam_hard_notif.minute = 0;
	rule_auth_soft_glam_hard_notif.second = 0;
	var auth_soft_glam_hard_notif = schedule.scheduleJob(rule_auth_soft_glam_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${authorPing}> **soft jolli-deadline is today**. If you have not submitted your work yet for proofreading, you are required to submit your draft documents to the author's channel by the end of the day.\n\n<@&${glamArtistPing}> **hard jolli-deadline for CC glamours is today**! Make sure to submit your work by the end of the day to the proofreaders channel.`).catch(console.error);
		//console.log(`Authors Soft Deadline Announced. Glam Artists Hard Deadline Announced.`);
	});

var rule_auth_hard_notif = new schedule.RecurrenceRule();
  rule_auth_hard_notif.tz = 'America/New_York';
	rule_auth_hard_notif.month = monthsNov;
	rule_auth_hard_notif.date = 11;
	rule_auth_hard_notif.hour = 12;
	rule_auth_hard_notif.minute = 0;
	rule_auth_hard_notif.second = 0;
	var auth_hard_notif = schedule.scheduleJob(rule_auth_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${authorPing}> **hard jolli-deadline is today**. Make sure you have submitted your completed works by the end of the day.`).catch(console.error);
		//console.log(`Authors Hard Deadline Announced.`);
	});

var rule_photo_cc_soft_notif = new schedule.RecurrenceRule();
  rule_photo_cc_soft_notif.tz = 'America/New_York';
	rule_photo_cc_soft_notif.month = monthsNov;
	rule_photo_cc_soft_notif.date = 7;
	rule_photo_cc_soft_notif.hour = 12;
	rule_photo_cc_soft_notif.minute = 0;
	rule_photo_cc_soft_notif.second = 0;
	var photo_cc_soft_notif = schedule.scheduleJob(rule_photo_cc_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **soft jolli-deadline for Community Couture articles is today**. Make sure you have started all Community Couture photography work before the end of the day.\n\n<@&${proofreaderPing}> **hard jolli-deadline for proofreading CC glamour sheets is today**! Make sure you have finished proofreading them by the end of the day.`).catch(console.error);
		//console.log(`Photographers CC Soft Deadline Announced. Proofreader CC Hard Deadline Announced`);
	});

var rule_photo_soft_notif = new schedule.RecurrenceRule();
  rule_photo_soft_notif.tz = 'America/New_York';
	rule_photo_soft_notif.month = monthsNov;
	rule_photo_soft_notif.date = 10;
	rule_photo_soft_notif.hour = 12;
	rule_photo_soft_notif.minute = 0;
	rule_photo_soft_notif.second = 0;
	var photo_soft_notif = schedule.scheduleJob(rule_photo_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **soft jolli-deadline for all non-glam articles is today**. Make sure you have started all photography work before the end of the day.\n\n<@&${photographerPing}> **hard jolli-deadline for Community Couture articles is today**. Make sure you have submitted all photography work for Community Couture articles by the end of the day.`).catch(console.error);
		//console.log(`Photographers Soft Deadline and Photographers CC Hard Deadline Announced.`);
	});

var rule_proof_gotm_hard_notif = new schedule.RecurrenceRule();
	rule_proof_gotm_hard_notif.tz = 'America/New_York';
	rule_proof_gotm_hard_notif.month = monthsNov;
	rule_proof_gotm_hard_notif.date = 11;
	rule_proof_gotm_hard_notif.hour = 12;
	rule_proof_gotm_hard_notif.minute = 1;
	rule_proof_gotm_hard_notif.second = 0;
	var proof_gotm_hard_notif = schedule.scheduleJob(rule_proof_gotm_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${proofreaderPing}> **hard jolli-deadline for proofreading the Glam of the Month is today**! Make sure you have finished proofreading them by the end of the day.`).catch(console.error);
		//console.log(`Proofreaders Glam of the Month Hard Deadline Announced.`);
	});

var rule_photo_hard_notif = new schedule.RecurrenceRule();
  rule_photo_hard_notif.tz = 'America/New_York';
	rule_photo_hard_notif.month = monthsNov;
	rule_photo_hard_notif.date = 13;
	rule_photo_hard_notif.hour = 12;
	rule_photo_hard_notif.minute = 0;
	rule_photo_hard_notif.second = 0;
	var photo_hard_notif = schedule.scheduleJob(rule_photo_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **hard jolli-deadline for all articles is today**! Make sure you have submitted all photography work by the end of the day.`).catch(console.error);
		//console.log(`Photographers Hard Deadline Announced.`);
	});

var rule_proof_hard_notif = new schedule.RecurrenceRule();
  rule_proof_hard_notif.tz = 'America/New_York';
	rule_proof_hard_notif.month = monthsNov;
	rule_proof_hard_notif.date = 13;
	rule_proof_hard_notif.hour = 12;
	rule_proof_hard_notif.minute = 1;
	rule_proof_hard_notif.second = 0;
	var proof_hard_notif = schedule.scheduleJob(rule_proof_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${proofreaderPing}> **hard jolli-deadline for all articles is today**! Make sure you have finished proofreading all articles by the end of the day.`).catch(console.error);
		//console.log(`Proofreaders Hard Deadline Announced.`);
	});

var rule_qa_photo_hard_notif = new schedule.RecurrenceRule();
	rule_qa_photo_hard_notif.tz = 'America/New_York';
	rule_qa_photo_hard_notif.month = monthsNov;
	rule_qa_photo_hard_notif.date = 15;
	rule_qa_photo_hard_notif.hour = 12;
	rule_qa_photo_hard_notif.minute = 0;
	rule_qa_photo_hard_notif.second = 0;
	  var qa_photo_hard_notif = schedule.scheduleJob(rule_qa_photo_hard_notif, function(){
		  client.channels.cache.get(channel_staff_announce).send(`<@&${qaPing}> **hard jolli-deadline for all photo QA is today**! Ensure that all photos have **three** QA before the end of the day. Tag your relevant photographer if there are any urgent changes needed.`).catch(console.error);
		  //console.log(`QA Photo Hard Deadline Announced.`);
	  });

var rule_design_soft_notif = new schedule.RecurrenceRule();
  rule_design_soft_notif.tz = 'America/New_York';
	rule_design_soft_notif.month = monthsDec;
	rule_design_soft_notif.date = 17;
	rule_design_soft_notif.hour = 12;
	rule_design_soft_notif.minute = 0;
	rule_design_soft_notif.second = 0;
	var design_soft_notif = schedule.scheduleJob(rule_design_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **soft jolli-deadline is today**. If you have not submitted to QA yet, you are required to submit a PDF of your work-in-progress to the designers channel by the end of the day.`).catch(console.error);
		//console.log(`Designers Soft Deadline Announced.`);
	});
var rule_design_hard_notif = new schedule.RecurrenceRule();
  rule_design_hard_notif.tz = 'America/New_York';
	rule_design_hard_notif.month = monthsDec;
	rule_design_hard_notif.date = 20;
	rule_design_hard_notif.hour = 12;
	rule_design_hard_notif.minute = 0;
	rule_design_hard_notif.second = 0;
	var design_hard_notif = schedule.scheduleJob(rule_design_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **hard jolli-deadline is today**! Make sure you have submitted the PDFs of your completed designs for QA by the end of the day.`).catch(console.error);
		//console.log(`Designers Hard Deadline Announced.`);
	});

var rule_design_qa_hard_notif = new schedule.RecurrenceRule();
	rule_design_qa_hard_notif.tz = 'America/New_York';
	rule_design_qa_hard_notif.month = monthsDec;
	rule_design_qa_hard_notif.date = 23;
	rule_design_qa_hard_notif.hour = 12;
	rule_design_qa_hard_notif.minute = 0;
	rule_design_qa_hard_notif.second = 0;
	var design_qa_hard_notif = schedule.scheduleJob(rule_design_qa_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${qaPing}> **hard jolli-deadline for designer QA today**! Ensure that all designs have **three** QA before the end of the day.`).catch(console.error);
		//console.log(`Designers QA Deadline Announced.`);
	});

var rule_design_ti_hard_notif = new schedule.RecurrenceRule();
	rule_design_ti_hard_notif.tz = 'America/New_York';
	rule_design_ti_hard_notif.month = monthsDec;
	rule_design_ti_hard_notif.hour = 12;
	rule_design_ti_hard_notif.date = 24;
	rule_design_ti_hard_notif.minute = 0;
	rule_design_ti_hard_notif.second = 0;
	var design_ti_hard_notif = schedule.scheduleJob(rule_design_ti_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **revision jolli-deadline is today**! Ensure that your InDesign packages are uploaded to the Drive with the right revisions! **Front Cover Designer** should also ensure that the social media promos are done and submitted to #social-media before magazine release.`).catch(console.error);
		//console.log(`Designers QA Deadline Announced.`);
	});

/* // EORZEA COLLECTION PING EDEON
var rule_eorzea_collection_notif = new schedule.RecurrenceRule();
  rule_eorzea_collection_notif.tz = 'America/New_York';
	rule_eorzea_collection_notif.month = months;
	rule_eorzea_collection_notif.date = 1;
	rule_eorzea_collection_notif.hour = 12;
	rule_eorzea_collection_notif.minute = 0;
	rule_eorzea_collection_notif.second = 0;
	var eorzea_collection_notif = schedule.scheduleJob(rule_eorzea_collection_notif, function(){
		client.channels.cache.get(channel_collaborators).send(`<@${edeonPing}> **It is time to renew the jolli-blood pact.**`).catch(console.error);
		//console.log(`Eorzea Collection ping sent.`);
	});
/*
/* ================================= SCHEDULE END =================================== */

/*
	f : dd MM yyyy hh:mm
	F : dayofweek dd MM yyyy hh:mm
	R : time till
*/

const pauseStaffReminders = (interaction) => {
  try {
    // skip next month's meeting reminders
    /*staff_meeting_second_notif_preday.cancelNext(true);
    staff_meeting_second_notif_day.cancelNext(true);
    staff_meeting_second_notif_hour.cancelNext(true);
    staff_meeting_second_start.cancelNext(true);*/

    // skip next month's magazine deadline reminders
    design_first_notif.cancelNext(true);
    glam_soft_notif.cancelNext(true);
    artist_soft_notif.cancelNext(true);
    artist_hard_notif.cancelNext(true);
    auth_soft_glam_hard_notif.cancelNext(true);
    auth_hard_notif.cancelNext(true);
    photo_cc_soft_notif.cancelNext(true);
    photo_soft_notif.cancelNext(true);
	proof_gotm_hard_notif.cancelNext(true);
    photo_hard_notif.cancelNext(true);
    proof_hard_notif.cancelNext(true);
	qa_photo_hard_notif.cancelNext(true);
    design_soft_notif.cancelNext(true);
    design_hard_notif.cancelNext(true);
	design_qa_hard_notif.cancelNext(true);
	design_ti_hard_notif.cancelNext(true);
    
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
		name: 'ricardo',
		description: 'A random Ricardo.'
	},
    {
      name: 'breakmonth',
      description: '[ADMIN ONLY FUNCTION] Pause all GPOSERS Staff notifications.',
    }, 
	{
		name: 'when-meeting',
		description: '[STAFF DISCORD ONLY] Lets you know when your next staff meeting is.'
	},
	{
		name: 'when-deadlines',
		description: '[STAFF DISCORD ONLY] Lets you know when all the deadlines are'
	},
	{
		name: 'when-ccol',
		description: '[STAFF DISCORD ONLY] When is the next Community Collection times'
	},
	{
		name: 'when-gotm',
		description: '[STAFF DISCORD ONLY] When is the next Glam of the Month times'
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
	client.user.setPresence({activities: [{name: 'Overwatch with my best friend Iza'}], status: 'available'});
});

client.on('message', async msg => {
	try {
		if (msg.author.bot) return;

		if (msg.content === "+hey") {
			console.log(msg.content);
		}
	} catch (error) {
		console.log(`SOMETHING WENT WRONG WITH A MESSAGE COMMAND: ${error}`);
		return;
	}
});

client.on('interactionCreate', async interaction => {
	try {
		if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

    if (interaction.commandName === 'urmom') {
        await interaction.reply('gay');
    }
    
    if (interaction.commandName === 'breakmonth') {
		// EDITOR ONLY
		if (interaction.member.roles.cache.some(r => r.id === staffEditorRole) || interaction.member.roles.cache.some(r => r.id === ricardoRole)) {
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

			await interaction.reply({ content: `**Are you jolli-sure you want to set the break month?** Once it is set, it cannot be unset until it auto-unsets itself month from now OR asking Yulia to reset the bot. Note that this won't cancel the following meeting.`, 
			components: [isBreakMonth_row], ephemeral: true, });
			// BUTTONS PARSED IN BUTTON INTERACTIONS
		} else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to set the break month!`);
		}
    }

	if (interaction.commandName === 'when-meeting') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {

			let nextMeeting = staff_mtg_start_odd.nextInvocation();
			let nextMeeting_2ndthurs = staff_mtg_2ndthurs_odd.nextInvocation();
			let nextMeeting_onDayEarly = staff_mtg_onDayEarly_odd.nextInvocation();
			let nextMeeting_onDayHour = staff_mtg_onDayHour_odd.nextInvocation();
			let ffMeeting = staff_mtg_start_even.nextInvocation();

			let nextDesignerMeeting = designer_mtg_start.nextInvocation();
			let nextDesignerMeeting_onDayEarly = designer_mtg_onDayEarly.nextInvocation();
			let nextDesignerMeeting_onDayHour = designer_mtg_onDayHour.nextInvocation();

			// check next meeting
			if (staff_mtg_start_even.nextInvocation().toDate() < staff_mtg_start_odd.nextInvocation().toDate())
			{
				nextMeeting = staff_mtg_start_even.nextInvocation();
				ffMeeting = staff_mtg_start_odd.nextInvocation();
				nextMeeting_2ndthurs = staff_mtg_2ndthurs_even.nextInvocation();
				nextMeeting_onDayEarly = staff_mtg_onDayEarly_even.nextInvocation();
				nextMeeting_onDayHour = staff_mtg_onDayHour_even.nextInvocation();
			}

			await interaction.reply(`>> **Your next scheduled jolli-meeting is at ${hammerTimeHelper(nextMeeting, 'F')} which is ${hammerTimeHelper(nextMeeting, 'R')} from now**\nReminder pings for this meeting will be sent out before the date during these times:\n- ${hammerTimeHelper(nextMeeting_2ndthurs, 'F')}\n- ${hammerTimeHelper(nextMeeting_onDayEarly, 'F')}\n- ${hammerTimeHelper(nextMeeting_onDayHour, 'F')}\n\nThe following meeting after that won't be till ${hammerTimeHelper(ffMeeting, 'F')} which is ${hammerTimeHelper(ffMeeting, 'R')} from now \n\nThe next **Designer Meeting** will be at ${hammerTimeHelper(nextDesignerMeeting, 'F')} which is ${hammerTimeHelper(nextDesignerMeeting, 'R')} from now. \nReminder pings for this designer meeting will be sent out before the date during these times:\n- ${hammerTimeHelper(nextDesignerMeeting_onDayEarly, 'F')}\n- ${hammerTimeHelper(nextDesignerMeeting_onDayHour, 'F')}`);
		}
		else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to see that!`);
		}
	}

    if (interaction.commandName === 'when-ccol') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {
			const opentime = ccolopen.nextInvocation();
			const closetime = ccolclose.nextInvocation();
			await interaction.reply(`Your next scheduled Community Collection Open is at ${hammerTimeHelper(opentime, 'F')} which is ${hammerTimeHelper(opentime, 'R')} from now. Closing is at ${hammerTimeHelper(closetime, 'F')} which is ${hammerTimeHelper(closetime, 'R')} from now.`);
		}
		else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to see that!`);
		}
	}

	if (interaction.commandName === 'when-gotm') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {
			const opentime = gotm_open.nextInvocation();
			const votetime = gotm_vote.nextInvocation();
			const closetime = gotm_close.nextInvocation();
			await interaction.reply(`Your next scheduled Glam of the Month is at ${hammerTimeHelper(opentime, 'F')} which is ${hammerTimeHelper(opentime, 'R')} from now.\nVoting is at ${hammerTimeHelper(votetime, 'F')} which is ${hammerTimeHelper(votetime, 'R')} from now. \nClosing is at ${hammerTimeHelper(closetime, 'F')} which is ${hammerTimeHelper(closetime, 'R')} from now.`);
		}
		else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to see that!`);
		}
	}

	if (interaction.commandName === 'when-deadlines') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {
			const deadlineEmbed = new EmbedBuilder()
				.setColor(0xff0000)
				.setAuthor({name: 'Jollibot', iconURL: 'https://i.imgur.com/gdb9maz.jpg'})
				.setTitle('GPOSERS Staff Deadlines')
				.setDescription(`Here are the GPOSERS Staff deadlines. Note that some of the dates displayed may or may not be accurate. You would be better off checking our [GPOSERS Calendar](https://teamup.com/kspn5vv6oz93v2bye6)!`)
				.addFields(
					{
						"name": `GLAM ARTIST`,
						"value": `Soft Deadline - 3rd - ${hammerTimeHelper(glam_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(glam_soft_notif.nextInvocation(), 'R')}
							Hard Deadline - 5th - ${hammerTimeHelper(auth_soft_glam_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(auth_soft_glam_hard_notif.nextInvocation(), 'R')}`
					},
					  {
						"name": `AUTHOR`,
						"value": `Soft Deadline - 5th - ${hammerTimeHelper(auth_soft_glam_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(auth_soft_glam_hard_notif.nextInvocation(), 'R')}
							Hard Deadline- 11th - ${hammerTimeHelper(auth_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(auth_hard_notif.nextInvocation(), 'R')}`
					  },
					  {
						"name": `PHOTOGRAPHER`,
						"value": `In-house CC Soft Deadline - 7th - ${hammerTimeHelper(photo_cc_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(photo_cc_soft_notif.nextInvocation(), 'R')}
							General Soft Deadline and In-house CC Hard Deadline - 10th - ${hammerTimeHelper(photo_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(photo_soft_notif.nextInvocation(), 'R')}
							Hard Deadline - 13th - ${hammerTimeHelper(photo_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(photo_hard_notif.nextInvocation(), 'R')}`
					  },
					  {
						"name": `DESIGNER`,
						"value": `Designer Limit Lift - 1st - ${hammerTimeHelper(design_first_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_first_notif.nextInvocation(), 'R')}
							Soft Deadline - 17th - ${hammerTimeHelper(design_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_soft_notif.nextInvocation(), 'R')}
							Hard Deadline - 20th - ${hammerTimeHelper(design_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_hard_notif.nextInvocation(), 'R')}
							Indesign Turn In Deadline - 24th - ${hammerTimeHelper(design_ti_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_ti_hard_notif.nextInvocation(), 'R')}`
					  },
					  {
						"name": `ARTIST`,
						"value": `Soft Deadline - 10th - ${hammerTimeHelper(artist_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(artist_soft_notif.nextInvocation(), 'R')}
							Hard Deadline - 13th - ${hammerTimeHelper(artist_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(artist_hard_notif.nextInvocation(), 'R')}`
					  },
					  {
						"name": `QA / PROOFREADER`,
						"value": `Proofreader CC Hard Deadline - 7th - ${hammerTimeHelper(photo_cc_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(photo_cc_soft_notif.nextInvocation(), 'R')}
							Proofreader Glam of the Month Hard Deadline - 11th - ${hammerTimeHelper(proof_gotm_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(proof_gotm_hard_notif.nextInvocation(), 'R')}}
							Proofreader Hard Deadline - 13th ${hammerTimeHelper(proof_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(proof_hard_notif.nextInvocation(), 'R')}
							QA Photo Hard Deadline - 15th - ${hammerTimeHelper(qa_photo_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(qa_photo_hard_notif.nextInvocation(), 'R')}
							QA Design Hard Deadline - 23rd - ${hammerTimeHelper(design_qa_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_qa_hard_notif.nextInvocation(), 'R')}`
					  }
				)
				.setTimestamp()

			interaction.reply({ embeds: [deadlineEmbed] });
		}
		else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to see that!`);
		}
	}

	if (interaction.commandName === 'jollidance') {
		await interaction.reply(`https://tenor.com/view/jollibee-chicken-joy-gif-26175242`);
	}

	if (interaction.commandName === 'ricardo') {
		await fetch(`https://g.tenor.com/v1/random?key=${tenorAPI}&q=ricardo%20milos&limit=1&media_filter=gif`)
			.then(response => response.json())
			.then(data => {
				const gifUrl = data.results[0].media[0].gif.url;
				interaction.reply(gifUrl);
			})
			.catch(e => {
				interaction.reply('Failed to find a Ricardo Gif');
				console.log(e);
				return;
			});
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
	} catch (error) {
		console.log(`SOMETHING WENT WRONG ON AN INTERACTION: ${error}`);
		return;
	}

    
	
});

client.login(TOKEN);