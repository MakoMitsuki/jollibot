require('dotenv').config();
const { REST, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const schedule = require('node-schedule');
const fetch = require('node-fetch');

const rest = new REST({ version: '10' }).setToken(TOKEN);
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const tenorAPI = process.env.TENOR_API_KEY;

const { loadState, updateState } = require('./stateManager');

/* ================================= SCHEDULE START ================================= */

const channel_staff_announce = process.env.CHANNEL_STAFF_ANNOUNCE;
const channels_weekly_feature = process.env.CHANNEL_WEEKLY_FEATURE;
const channels_community_collection = process.env.CHANNEL_COMMUNITY_COLLECTION;
const channels_gotm = process.env.CHANNEL_GLAM_OF_THE_MONTH;
const channels_arrw = process.env.CHANNEL_ARRW

const staffDiscordId = process.env.STAFF_DISCORD_ID;
const testDiscordId = process.env.ROBOT_YULIA_SERVER_ID;

const yuliaPing = process.env.YULIA;
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

// ==================================== WEEKLY FEATURE ======================================

// WEEKLY FEATURE OPEN
schedule.scheduleJob({hour: 12, minute: 0, dayOfWeek: 0, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_weekly_feature).send(`<@&${contestAlertsPing}> **[Submissions for the Weekly Feature are now OPEN!]**`).catch(console.error);
});

// WEEKLY FEATURE CLOSE
schedule.scheduleJob({hour: 12, minute: 0, dayOfWeek: 5, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_weekly_feature).send(`<@&${contestAlertsPing}> **[WEEKLY FEATURE SUBMISSIONS ARE NOW CLOSED!]**`).catch(console.error);
  //console.log(`Weekly Feature closed.`);
});

// ==================================== COMMUNITY COLLECTION ===================================

const monthsCommunityCollection = [1, 3, 6, 8, 10, 11];

const ccol_embed = {
	"title": `Community Collection submissions for the next issue is now open!`,
	"description": `Submit **up to FOUR of your best screenshots or FFXIV-related artworks** to be featured in the magazine. Remember that **modded screenshots/custom poses/NSFW are NOT allowed** to be submitted here.`,
	"color": 0x005f73
  }

// COMMUNITY COLLECTION OPEN - 1ST EARLY NORMAL
var ccolopen = schedule.scheduleJob({month: monthsCommunityCollection, date: 1, hour: 12, minute: 30, tz: 'America/New_York'}, function(){
  //client.channels.cache.get(channels_community_collection).send(`<@&${contestAlertsPing}> **[Submissions for the Community Collection are now OPEN!]**`).catch(console.error);
  client.channels.cache.get(channels_community_collection).send({content: `<@&${contestAlertsPing}>`,  embeds: [ccol_embed] }).catch(console.error); 
  //console.log(`Community Collection opened.`);
});

// COMMUNITY COLLECTION CLOSE - 20TH EARLY NORMAL
var ccolclose = schedule.scheduleJob({month: monthsCommunityCollection, date: 20, hour: 0, minute: 30, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_community_collection).send(`<@&${contestAlertsPing}> **[COMMUNITY COLLECTION SUBMISSIONS ARE NOW CLOSED!]**`).catch(console.error);
  //console.log(`Community Collection closed.`);
});

// =========================================== GOTM ==============================================

const monthsGOTM = [1, 3, 6, 8, 9, 11];

// GLAM OF THE MONTH - ENDS 26TH EARLY NORMAL - DOES NOT RUN NOVEMBER
const gotm_vote_embed = {
	"title": `Glam of the Month Voting Time!`,
	"description": ` Submissions for the next issue are now closed! Everyone choose **ONE glamour** you'd like to be featured in the magazine! Cast your vote by reacting <:gposers1:1119066668912623746> under the glam.`,
	"color": 0x005f73
  }

var gotm_vote = schedule.scheduleJob({month: monthsGOTM, date: 26, hour: 8, minute: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channels_gotm).send({content: `<@&${contestAlertsPing}>`,  embeds: [gotm_vote_embed] }).catch(console.error);
	//console.log(`Community Collection closed.`);
  });

var gotm_close = schedule.scheduleJob({month: monthsGOTM, date: 26, hour: 14, minute: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channels_gotm).send(`<@&${contestAlertsPing}> **VOTING NOW CLOSED!** Tune in to the next issue for the winner's feature! <:gposers1:1119066668912623746>`).catch(console.error);
	//console.log(`Community Collection closed.`);
  });

// GLAM OF THE MONTH OPEN - 20TH EARLY NORMAL - DOES NOT RUN NOVEMBER
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
		"value": `The 26th of this month.`
	  }
	]
  }

var gotm_open = schedule.scheduleJob({month: monthsGOTM, date: 20, hour: 12, minute: 1, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_gotm).send({content: `<@&${contestAlertsPing}>`,  embeds: [gotm_open_embed] }).catch(console.error); 
  //console.log(`Community Collection opened.`);
});

// ============================================= REALM REWORN =========================================

const monthsARRW = monthsCommunityCollection;

// STARTS 5th to the 19th EARLY MONTH
const arrw_open_embed = () => {
	const cst = loadState();
	return {
		"type": "rich",
		"title": "A Realm Reworn submissions now being accepted!",
		"description": `Submit your best look using our chosen in-game glamour item! All submissions that [meet the rules and requirements](https://discord.com/channels/465931452085829643/1415352452743430164/1415354792015827056) will be included in the upcoming issue of GPOSERS Magazine!`,
		"color": 0x005f73,
		"fields": [
			{
				"name": "Current Theme and Item",
				"value": `The theme is **${cst.theme}** and the required item is **${cst.item}**`,
			},
			{
				"name": `Submission Format`,
				"value": `\`\`\`Name/IGN:\nServer (optional):\nBrief description of your glamour (optional):\nExample:\nName: Leeja Llen\nServer: Lamia\nI am addicted to thighboots, and these are no exception!\`\`\``
			},
			{
				"name": "Deadline of submissions",
				"value": "The 19th of this month."

			}
		]
	};
}

// ARRW OPEN - 5th EARLY NORMAL
var arrw_open = schedule.scheduleJob({month: monthsARRW, date: 5, hour: 12, minute: 30, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_arrw).send({content: `<@&${contestAlertsPing}>`,  embeds: [arrw_open_embed()] }).catch(console.error); 
});

// ARRW CLOSE - 19TH EARLY NORMAL
var arrw_close = schedule.scheduleJob({month: monthsARRW, date: 19, hour: 0, minute: 30, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_arrw).send(`<@&${contestAlertsPing}> **[A REALM REWORN SUBMISSIONS ARE NOW CLOSED!] Stay tuned for the next prompt.**`).catch(console.error);
});

// ARRW EDITOR REMINDER - 1ST EARLY NORMAL
var arrw_reminder = schedule.scheduleJob({month: monthsARRW, date: 1, hour: 12, minute: 30, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channel_staff_announce).send(`<@&${staffEditorRole}> The next A Realm Reworn ping will go out on ${hammerTimeHelper(arrw_open.nextInvocation(), 'R')}. Make sure to check if the theme is set correctly with the \`/test-arrw\` command before then.`).catch(console.error); 
});

// ============================================= STAFF MEETINGS ========================================
const earlyMeetingMonths = [ 1, 5, 8 ]; // february, june, sep
const lateMeetingMonths = [ 3, 10 ]; // april, nov

// EARLY
var early_staff_mtg_start = schedule.scheduleJob({month: earlyMeetingMonths, date: second_sat_dates, dayOfWeek: 6, hour: 10, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Our <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting is starting now!**\n\nhttps://media.tenor.com/c3pKaYLittEAAAAd/jollibee-chicken-joy.gif`).catch(console.error);
  });

var early_staff_mtg_2ndthurs = schedule.scheduleJob({month: earlyMeetingMonths, date: second_thurs_dates, dayOfWeek: 4, hour: 10, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(
		`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting this weekend:** ${hammerTimeHelper(early_staff_mtg_start.nextInvocation(), 'F')} ${hammerTimeHelper(early_staff_mtg_start.nextInvocation(), 'R')}`
		).catch(console.error);	
});

var early_staff_mtg_onDayEarly = schedule.scheduleJob({month: earlyMeetingMonths, date: second_sat_dates, dayOfWeek: 6, hour: 5, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting today!** It starts ${hammerTimeHelper(early_staff_mtg_start.nextInvocation(), 'R')} at ${hammerTimeHelper(early_staff_mtg_start.nextInvocation(), 'f')}`).catch(console.error);
});

var early_staff_mtg_onDayHour = schedule.scheduleJob({month: earlyMeetingMonths, date: second_sat_dates, dayOfWeek: 6, hour: 9, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting really soon! It's starting ${hammerTimeHelper(early_staff_mtg_start.nextInvocation(), 'R')}!**`).catch(console.error);
});

// LATE
var late_staff_mtg_start = schedule.scheduleJob({month: lateMeetingMonths, date: second_sat_dates, dayOfWeek: 6, hour: 17, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Our <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting is starting now!**\n\nhttps://media.tenor.com/c3pKaYLittEAAAAd/jollibee-chicken-joy.gif`).catch(console.error);
  });

var late_staff_mtg_2ndthurs = schedule.scheduleJob({month: lateMeetingMonths, date: second_thurs_dates, dayOfWeek: 4, hour: 17, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(
		`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting this weekend:** ${hammerTimeHelper(late_staff_mtg_start.nextInvocation(), 'F')} ${hammerTimeHelper(late_staff_mtg_start.nextInvocation(), 'R')}`
		).catch(console.error);	
});

var late_staff_mtg_onDayEarly = schedule.scheduleJob({month: lateMeetingMonths, date: second_sat_dates, dayOfWeek: 6, hour: 12, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting today!** It starts ${hammerTimeHelper(late_staff_mtg_start.nextInvocation(), 'R')} at ${hammerTimeHelper(late_staff_mtg_start.nextInvocation(), 'f')}`).catch(console.error);
});

var late_staff_mtg_onDayHour = schedule.scheduleJob({month: lateMeetingMonths, date: second_sat_dates, dayOfWeek: 6, hour: 16, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting really soon! It's starting ${hammerTimeHelper(late_staff_mtg_start.nextInvocation(), 'R')}!**`).catch(console.error);
});

// ============================================= CONTRIBUTORS SHEET ==================================

// STAFF CONTRIBUTORS TAB DEADLINE - 20TH EARLY MONTH EXCEPT ON OCT 15TH
var rule_sheet_notif = new schedule.RecurrenceRule();
	rule_sheet_notif.tz = 'America/New_York';
	rule_sheet_notif.month =[1, 3, 6, 8, 11];
	rule_sheet_notif.date = 20;
	rule_sheet_notif.hour = 0;
	rule_sheet_notif.minute = 0;
	rule_sheet_notif.second = 0;
	var sheet_notif = schedule.scheduleJob(rule_sheet_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${staffPing}> <@&${hiatusPing}> **Today is the deadline to sign the contributor's tab!** Those who have not signed up yet will be in trouble. *Staff on hiatus are also required to do this.*`).catch(console.error);
	});

// DECEMBER ISSUE THAT PINGS ON OCT 15TH
var rule_sheetdec_notif = new schedule.RecurrenceRule();
	rule_sheetdec_notif.tz = 'America/New_York';
	rule_sheetdec_notif.month = 9;
	rule_sheetdec_notif.date = 15;
	rule_sheetdec_notif.hour = 0;
	rule_sheetdec_notif.minute = 0;
	rule_sheetdec_notif.second = 0;
	var sheetdec_notif = schedule.scheduleJob(rule_sheetdec_notif, function(){
	  client.channels.cache.get(channel_staff_announce).send(`<@&${staffPing}> <@&${hiatusPing}> **Today is the deadline to sign the contributor's tab for the __December issue__!** Those who have not signed up yet will be in trouble. *Staff on hiatus are also required to do this.*`).catch(console.error);
	});

// ============================================== ARTIST =============================================

// ARTIST HARD DEADLINE - LATE MONTH 8TH
var rule_artist_hard_notif = new schedule.RecurrenceRule();
	rule_artist_hard_notif.tz = 'America/New_York';
	rule_artist_hard_notif.month = [0, 2, 4, 7, 9];
	rule_artist_hard_notif.date = 8;
	rule_artist_hard_notif.hour = 12;
	rule_artist_hard_notif.minute = 2;
	rule_artist_hard_notif.second = 0;
	var artist_hard_notif = schedule.scheduleJob(rule_artist_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${artistPing}> **hard jolli-deadline for all articles is today**! Make sure you have submitted all artwork by the end of the day and ping your relevant Designer.`).catch(console.error);
	});

// HOLIDAY ARTIST HARD DEADLINE - DEC 1ST
var rule_hol_artist_hard_notif = new schedule.RecurrenceRule();
	rule_hol_artist_hard_notif.tz = 'America/New_York';
	rule_hol_artist_hard_notif.month = 11;
	rule_hol_artist_hard_notif.date = 1;
	rule_hol_artist_hard_notif.hour = 12;
	rule_hol_artist_hard_notif.minute = 2;
	rule_hol_artist_hard_notif.second = 0;
	var hol_artist_hard_notif = schedule.scheduleJob(rule_hol_artist_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${artistPing}> **hard jolli-deadline for the December is today**! Make sure you have submitted all artwork by the end of the day and ping your relevant Designer.`).catch(console.error);
	});

// ==================================== NORMAL MAGAZINE DATES ========================================
const monthsEarlyNormal = [1, 3, 6, 8, 9, 11]; // feb, apr, jul, sept, [oct for non designer stuff], dec
const monthsLateNormal = [0, 2, 4, 7, 9, 10]; // jan, mar, may, aug, oct, [nov for non designer stuff]

// GLAM ARTIST LIMIT - 17TH EARLY MONTH
var rule_glamartist_limit_lift_notif = new schedule.RecurrenceRule();
	rule_glamartist_limit_lift_notif.tz = 'America/New_York';
	rule_glamartist_limit_lift_notif.month = monthsEarlyNormal;
	rule_glamartist_limit_lift_notif.date = 17;
	rule_glamartist_limit_lift_notif.hour = 0;
	rule_glamartist_limit_lift_notif.minute = 1;
	rule_glamartist_limit_lift_notif.second = 0;
	var glamartist_limit_lift_notif = schedule.scheduleJob(rule_glamartist_limit_lift_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${glamArtistPing}> **The limit on picking up glam slots has now been removed for the month.**`).catch(console.error);
	});

// GLAM ARTIST CHECK-IN DEADLINE - 21ST EARLY MONTH
var rule_glam_checkin_notif = new schedule.RecurrenceRule();
	rule_glam_checkin_notif.tz = 'America/New_York';
	rule_glam_checkin_notif.month = monthsEarlyNormal;
	rule_glam_checkin_notif.date = 21;
	rule_glam_checkin_notif.hour = 12;
	rule_glam_checkin_notif.minute = 0;
	rule_glam_checkin_notif.second = 0;
	var glam_checkin_notif = schedule.scheduleJob(rule_glam_checkin_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${glamArtistPing}> **check-in jolli-deadline for CC glamours is today**! If you already haven't, make sure to submit your glams in the glam artist channel by the end of the day for review.`).catch(console.error);
	});

// GLAM ARTIST HARD DEADLINE - 23RD EARLY MONTH
var rule_glam_hard_notif = new schedule.RecurrenceRule();
	rule_glam_hard_notif.tz = 'America/New_York';
	rule_glam_hard_notif.month = monthsEarlyNormal;
	rule_glam_hard_notif.date = 23;
	rule_glam_hard_notif.hour = 12;
	rule_glam_hard_notif.minute = 0;
	rule_glam_hard_notif.second = 0;
	var glam_hard_notif = schedule.scheduleJob(rule_glam_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${glamArtistPing}> **hard jolli-deadline for CC glamours is today**! If you already haven't, make sure to submit your work in the proofreading QA channel by the end of the day and upload your chara files.`).catch(console.error);
	});

// AUTHOR SOFT DEADLINE - 25TH EARLY MONTH
var rule_auth_soft_notif = new schedule.RecurrenceRule();
  rule_auth_soft_notif.tz = 'America/New_York';
	rule_auth_soft_notif.month = monthsEarlyNormal;
	rule_auth_soft_notif.date = 25;
	rule_auth_soft_notif.hour = 12;
	rule_auth_soft_notif.minute = 0;
	rule_auth_soft_notif.second = 0;
	var auth_soft_notif = schedule.scheduleJob(rule_auth_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${authorPing}> **soft jolli-deadline is today**. If you have not submitted your work yet for proofreading, you are required to submit your draft documents to the author's channel by the end of the day.`).catch(console.error);
	});

// GLAM ARTIST REVISION DEADLINE - 25TH EARLY MONTH
var rule_glam_rev_notif = new schedule.RecurrenceRule();
	rule_glam_rev_notif.tz = 'America/New_York';
	rule_glam_rev_notif.month = monthsEarlyNormal;
	rule_glam_rev_notif.date = 25;
	rule_glam_rev_notif.hour = 12;
	rule_glam_rev_notif.minute = 1;
	rule_glam_rev_notif.second = 0;
	var glam_rev_notif = schedule.scheduleJob(rule_glam_rev_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${glamArtistPing}> **revision jolli-deadline for CC glamours is today**! If you already haven't, make sure to submit your work by the end of the day in the proofreader's channel and your glam's chara file in the glam folder so that the Photographers can finish work.`).catch(console.error);
	});

// PROOF CC DEADLINE - 28TH EARLY MONTH
var rule_proof_cc_hard_notif = new schedule.RecurrenceRule();
	rule_proof_cc_hard_notif.tz = 'America/New_York';
	rule_proof_cc_hard_notif.month = monthsEarlyNormal;
	rule_proof_cc_hard_notif.date = 28;
	rule_proof_cc_hard_notif.hour = 12;
	rule_proof_cc_hard_notif.minute = 0;
	rule_proof_cc_hard_notif.second = 0;
	var proof_cc_hard_notif = schedule.scheduleJob(rule_proof_cc_hard_notif, function(){
	  client.channels.cache.get(channel_staff_announce).send(`<@&${proofreaderPing}> **hard jolli-deadline for proofreading CC glamour sheets is today**! Make sure you have finished proofreading them by the end of the day.`).catch(console.error);
	});

// AUTHOR HARD DEADLINE - 30TH EARLY MONTH INCLUDING OCTOBER EXCEPT FEBRUARY at 28th
var rule_auth_hard_notif = new schedule.RecurrenceRule();
  rule_auth_hard_notif.tz = 'America/New_York';
	rule_auth_hard_notif.month = [3, 6, 8, 9, 11];
	rule_auth_hard_notif.date = 30;
	rule_auth_hard_notif.hour = 12;
	rule_auth_hard_notif.minute = 0;
	rule_auth_hard_notif.second = 0;
	var auth_hard_notif = schedule.scheduleJob(rule_auth_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${authorPing}> **hard jolli-deadline is today**. Make sure you have submitted your completed works by the end of the day.`).catch(console.error);
	});

// AUTHOR HARD DEADLINE FEB 28TH
var rule_auth_hard_feb_notif = new schedule.RecurrenceRule();
  rule_auth_hard_feb_notif.tz = 'America/New_York';
	rule_auth_hard_feb_notif.month = 1;
	rule_auth_hard_feb_notif.date = 28;
	rule_auth_hard_feb_notif.hour = 12;
	rule_auth_hard_feb_notif.minute = 0;
	rule_auth_hard_feb_notif.second = 0;
	var auth_hard_feb_notif = schedule.scheduleJob(rule_auth_hard_feb_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${authorPing}> **hard jolli-deadline for February is today**. Make sure you have submitted your completed works by the end of the day.`).catch(console.error);
	});

// CC PHOTO HARD DEADLINE - LATE MONTH 1ST EXCEPT MARCH ISSUE -> 3RD MARCH
var rule_cc_photo_hard_notif = new schedule.RecurrenceRule();
	rule_cc_photo_hard_notif.tz = 'America/New_York';
	rule_cc_photo_hard_notif.month = [0, 4, 7, 9, 10];
	rule_cc_photo_hard_notif.date = 1;
	rule_cc_photo_hard_notif.hour = 12;
	rule_cc_photo_hard_notif.minute = 0;
	rule_cc_photo_hard_notif.second = 0;
	var cc_photo_hard_notif = schedule.scheduleJob(rule_cc_photo_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **hard jolli-deadline for Community Couture articles is today**. Make sure you have submitted all photography work for Community Couture articles by the end of the day.`).catch(console.error);
	});

// CC PHOTO HARD DEADLINE MARCH (3rd)
var rule_cc_photo_hard_mar_notif = new schedule.RecurrenceRule();
	rule_cc_photo_hard_mar_notif.tz = 'America/New_York';
	rule_cc_photo_hard_mar_notif.month = 2;
	rule_cc_photo_hard_mar_notif.date = 3;
	rule_cc_photo_hard_mar_notif.hour = 12;
	rule_cc_photo_hard_mar_notif.minute = 0;
	rule_cc_photo_hard_mar_notif.second = 0;
	var cc_photo_hard_mar_notif = schedule.scheduleJob(rule_cc_photo_hard_mar_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **hard jolli-deadline for the March Community Couture articles is today**. Make sure you have submitted all photography work for Community Couture articles by the end of the day.`).catch(console.error);
	});

// PROOFREADING GENERAL DEADLINE - LATE MONTH 2ND
var rule_proof_hard_notif = new schedule.RecurrenceRule();
	rule_proof_hard_notif.tz = 'America/New_York';
	rule_proof_hard_notif.month = monthsLateNormal;
	rule_proof_hard_notif.date = 2;
	rule_proof_hard_notif.hour = 12;
	rule_proof_hard_notif.minute = 1;
	rule_proof_hard_notif.second = 0;
	var proof_hard_notif = schedule.scheduleJob(rule_proof_hard_notif, function(){
	  client.channels.cache.get(channel_staff_announce).send(`<@&${proofreaderPing}> **hard jolli-deadline for all articles is today**! Make sure you have finished proofreading all articles by the end of the day.`).catch(console.error);
	});

// QA CC PHOTO DEADLINE - LATE MONTH 4TH EXCEPT MARCH (5TH)
var rule_qa_cc_photo_hard_notif = new schedule.RecurrenceRule();
	rule_qa_cc_photo_hard_notif.tz = 'America/New_York';
	rule_qa_cc_photo_hard_notif.month = [0, 4, 7, 9, 10];
	rule_qa_cc_photo_hard_notif.date = 4;
	rule_qa_cc_photo_hard_notif.hour = 12;
	rule_qa_cc_photo_hard_notif.minute = 0;
	rule_qa_cc_photo_hard_notif.second = 0;
	  var qa_cc_photo_hard_notif = schedule.scheduleJob(rule_qa_cc_photo_hard_notif, function(){
		  client.channels.cache.get(channel_staff_announce).send(`<@&${qaPing}> **hard jolli-deadline for all CC photo QA is today**! Ensure that all CC photos have **three** QA before the end of the day. Tag your relevant photographer if there are any urgent changes needed.`).catch(console.error);
	  });

// QA CC PHOTO DEADLINE MARCH (5TH)
var rule_qa_cc_photo_hard_mar_notif = new schedule.RecurrenceRule();
	rule_qa_cc_photo_hard_mar_notif.tz = 'America/New_York';
	rule_qa_cc_photo_hard_mar_notif.month = 2;
	rule_qa_cc_photo_hard_mar_notif.date = 5;
	rule_qa_cc_photo_hard_mar_notif.hour = 12;
	rule_qa_cc_photo_hard_mar_notif.minute = 0;
	rule_qa_cc_photo_hard_mar_notif.second = 0;
	  var qa_cc_photo_hard_mar_notif = schedule.scheduleJob(rule_qa_cc_photo_hard_mar_notif, function(){
		  client.channels.cache.get(channel_staff_announce).send(`<@&${qaPing}> **hard jolli-deadline for all CC photo QA is today**! Ensure that all CC photos have **three** QA before the end of the day. Tag your relevant photographer if there are any urgent changes needed.`).catch(console.error);
	  });

// PHOTO HARD DEADLINE - LATE MONTH 8TH
var rule_photo_hard_notif = new schedule.RecurrenceRule();
  rule_photo_hard_notif.tz = 'America/New_York';
	rule_photo_hard_notif.month = monthsLateNormal;
	rule_photo_hard_notif.date = 8;
	rule_photo_hard_notif.hour = 12;
	rule_photo_hard_notif.minute = 0;
	rule_photo_hard_notif.second = 0;
	var photo_hard_notif = schedule.scheduleJob(rule_photo_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **hard jolli-deadline for all articles is today**! Make sure you have submitted all photography work by the end of the day.`).catch(console.error);
	});

// QA PHOTO DEADLINE - LATE MONTH 11TH
var rule_qa_photo_hard_notif = new schedule.RecurrenceRule();
	rule_qa_photo_hard_notif.tz = 'America/New_York';
	rule_qa_photo_hard_notif.month = monthsLateNormal;
	rule_qa_photo_hard_notif.date = 11;
	rule_qa_photo_hard_notif.hour = 12;
	rule_qa_photo_hard_notif.minute = 0;
	rule_qa_photo_hard_notif.second = 0;
	  var qa_photo_hard_notif = schedule.scheduleJob(rule_qa_photo_hard_notif, function(){
		  client.channels.cache.get(channel_staff_announce).send(`<@&${qaPing}> **hard jolli-deadline for all photo QA is today**! Ensure that all photos have **three** QA before the end of the day. Tag your relevant photographer if there are any urgent changes needed.`).catch(console.error);
	  });

// =============================== DESIGNER - NORMAL ==============================

const monthsDesignerNormal = [0, 2, 4, 7, 9]; // jan, mar, may, aug, oct, [NOT NOVEMBER]

// DESIGNER LIMIT - 20TH EARLY MONTH
var rule_design_first_notif = new schedule.RecurrenceRule();
  rule_design_first_notif.tz = 'America/New_York';
	rule_design_first_notif.month = [1, 3, 6, 8, 11]; // normal early months
	rule_design_first_notif.date = 20;
	rule_design_first_notif.hour = 0;
	rule_design_first_notif.minute = 1;
	rule_design_first_notif.second = 0;
	var design_first_notif = schedule.scheduleJob(rule_design_first_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **The limit on picking up articles has now been removed for the month.**`).catch(console.error);
	});

// DESIGNER SOFT DEADLINE - LATE MONTH 15TH
var rule_design_soft_notif = new schedule.RecurrenceRule();
  rule_design_soft_notif.tz = 'America/New_York';
	rule_design_soft_notif.month = monthsDesignerNormal;
	rule_design_soft_notif.date = 15;
	rule_design_soft_notif.hour = 12;
	rule_design_soft_notif.minute = 0;
	rule_design_soft_notif.second = 0;
	var design_soft_notif = schedule.scheduleJob(rule_design_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **soft jolli-deadline is today**. If you have not submitted your work for QA yet, you are required to submit a PDF of your work-in-progress to the designers channel by the end of the day.`).catch(console.error);
	});

// DESIGNER HARD DEADLINE - LATE MONTH 20TH
var rule_design_hard_notif = new schedule.RecurrenceRule();
	rule_design_hard_notif.tz = 'America/New_York';
	rule_design_hard_notif.month = monthsDesignerNormal;
	rule_design_hard_notif.date = 20;
	rule_design_hard_notif.hour = 12;
	rule_design_hard_notif.minute = 0;
	rule_design_hard_notif.second = 0;
	var design_hard_notif = schedule.scheduleJob(rule_design_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **hard jolli-deadline is today**! Make sure you have submitted the PDFs of your completed designs for QA by the end of the day.`).catch(console.error);
	});

// QA DESIGN HARD DEADLINE - LATE MONTH 23RD
var rule_design_qa_hard_notif = new schedule.RecurrenceRule();
	rule_design_qa_hard_notif.tz = 'America/New_York';
	rule_design_qa_hard_notif.month = monthsDesignerNormal;
	rule_design_qa_hard_notif.date = 23;
	rule_design_qa_hard_notif.hour = 12;
	rule_design_qa_hard_notif.minute = 0;
	rule_design_qa_hard_notif.second = 0;
	var design_qa_hard_notif = schedule.scheduleJob(rule_design_qa_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${qaPing}> **hard jolli-deadline for designer QA today**! Ensure that all designs have **three** QA before the end of the day.`).catch(console.error);
	});

// DESIGNER REVISION DEADLINE - LATE MONTH 24TH
var rule_design_rev_hard_notif = new schedule.RecurrenceRule();
	rule_design_rev_hard_notif.tz = 'America/New_York';
	rule_design_rev_hard_notif.month = monthsDesignerNormal;
	rule_design_rev_hard_notif.date = 24;
	rule_design_rev_hard_notif.hour = 12;
	rule_design_rev_hard_notif.minute = 0;
	rule_design_rev_hard_notif.second = 0;
	var design_rev_hard_notif = schedule.scheduleJob(rule_design_rev_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **revision jolli-deadline is today**! Ensure that your InDesign packages are uploaded to the Drive with the right revisions! **Front Cover Designer and Recruitment Page Designer** should also ensure that the social media and website promos are done and submitted to the Publishing folder in the Drive before magazine release.`).catch(console.error);
	});

// =============================== DESIGNER - HOLIDAY SCHEDULE ==============================

// DESIGNER LIMIT - 20TH EARLY MONTH
var rule_hol_design_first_notif = new schedule.RecurrenceRule();
  rule_hol_design_first_notif.tz = 'America/New_York';
	rule_hol_design_first_notif.month = 11; // normal early months
	rule_hol_design_first_notif.date = 15;
	rule_hol_design_first_notif.hour = 0;
	rule_hol_design_first_notif.minute = 1;
	rule_hol_design_first_notif.second = 0;
	var hol_design_first_notif = schedule.scheduleJob(rule_hol_design_first_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **The limit on picking up articles has now been removed for the December issue.**`).catch(console.error);
	});

// HOLIDAY DESIGNER SOFT DEADLINE - DEC 12TH
var rule_hol_design_soft_notif = new schedule.RecurrenceRule();
	rule_hol_design_soft_notif.tz = 'America/New_York';
	rule_hol_design_soft_notif.month = 11;
	rule_hol_design_soft_notif.date = 12;
	rule_hol_design_soft_notif.hour = 12;
	rule_hol_design_soft_notif.minute = 0;
	rule_hol_design_soft_notif.second = 0;
	var hol_design_soft_notif = schedule.scheduleJob(rule_hol_design_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **soft jolli-deadline for the December issue is today**. If you have not submitted your work for QA yet, you are required to submit a PDF of your work-in-progress to the designers channel by the end of the day.`).catch(console.error);
	});

// HOLIDAY DESIGNER HARD DEADLINE - DEC 15TH
var rule_hol_design_hard_notif = new schedule.RecurrenceRule();
	rule_hol_design_hard_notif.tz = 'America/New_York';
	rule_hol_design_hard_notif.month = 11;
	rule_hol_design_hard_notif.date = 15;
	rule_hol_design_hard_notif.hour = 12;
	rule_hol_design_hard_notif.minute = 0;
	rule_hol_design_hard_notif.second = 0;
	var hol_design_hard_notif = schedule.scheduleJob(rule_hol_design_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **hard jolli-deadline for the December issue is today**! Make sure you have submitted the PDFs of your completed designs for QA by the end of the day.`).catch(console.error);
	});

// HOLIDAY QA DESIGN HARD DEADLINE - DEC 18TH
var rule_hol_design_qa_hard_notif = new schedule.RecurrenceRule();
	rule_hol_design_qa_hard_notif.tz = 'America/New_York';
	rule_hol_design_qa_hard_notif.month = 11;
	rule_hol_design_qa_hard_notif.date = 18;
	rule_hol_design_qa_hard_notif.hour = 12;
	rule_hol_design_qa_hard_notif.minute = 0;
	rule_hol_design_qa_hard_notif.second = 0;
	var hol_design_qa_hard_notif = schedule.scheduleJob(rule_hol_design_qa_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${qaPing}> **hard jolli-deadline for the December issue Designer QA is today**! Ensure that all designs have **three** QA before the end of the day.`).catch(console.error);
	});

// HOLIDAY DESIGNER REVISION DEADLINE - DEC 19TH
var rule_hol_design_rev_hard_notif = new schedule.RecurrenceRule();
	rule_hol_design_rev_hard_notif.tz = 'America/New_York';
	rule_hol_design_rev_hard_notif.month = 11;
	rule_hol_design_rev_hard_notif.date = 19;
	rule_hol_design_rev_hard_notif.hour = 12;
	rule_hol_design_rev_hard_notif.minute = 0;
	rule_hol_design_rev_hard_notif.second = 0;
	var hol_design_rev_hard_notif = schedule.scheduleJob(rule_hol_design_rev_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **revision jolli-deadline for the December issue is today**! Ensure that your InDesign packages are uploaded to the Drive with the right revisions! **Front Cover Designer and Recruitment Page Designer** should also ensure that the social media and website promos are done and submitted to the Publishing folder in the Drive before magazine release.`).catch(console.error);
	});

/* ================================= SCHEDULE END =========================================== */

/*
	f : dd MM yyyy hh:mm
	F : dayofweek dd MM yyyy hh:mm
	R : time till
*/

const pauseNextStaffMeeting = (interaction) => {
	try {
		// skip meeting
		let isNextLate = new Date(staff_mtg_start_late) < new Date(staff_mtg_start_early);

		if (isNextLate){
			late_staff_mtg_2ndthurs.cancelNext(true);
			late_staff_mtg_onDayEarly.cancelNext(true);
			late_staff_mtg_onDayHour.cancelNext(true);
			late_staff_mtg_start.cancelNext(true);
		} else {
			early_staff_mtg_2ndthurs.cancelNext(true);
			early_staff_mtg_onDayEarly.cancelNext(true);
			early_staff_mtg_onDayHour.cancelNext(true);
			early_staff_mtg_start.cancelNext(true);
		}

		// TODO: client log success
		interaction.reply(`**Next staff meeting cancelled!** Type \`/when-meeting\` to double-check when the next meeting is.`);
	} catch (error) {
		// TODO: client log error
		interaction.reply(`**ERROR:** Something went jolli-wrong when cancelling next staff meeting! <@${yuliaPing} pls fix.>`);
		console.log(`[[SKIPSTAFFMEETING]] ${error}`);
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
		name: 'skip-staff-meeting',
		description: '[ADMIN ONLY FUNCTION] Skip next staff meeting.',
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
	{
		name: 'when-arrw',
		description: '[STAFF DISCORD ONLY] When is the next A Realm Reworn times and what is the next prompt'
	},
	{
		name: 'test-arrw',
		description: '[STAFF DISCORD ONLY]'
	},
	{
		name: 'set-arrw',
		description: '[STAFF DISCORD ONLY] Set next A Realm Reworn Item and Theme',
		options: [
			{
				name: 'theme',
				description: 'Theme set',
				type: 3, // 3 = STRING
				required: true
			},
			{
				name: 'item',
				description: 'Item set',
				type: 3, // 3 = STRING
				required: true
			}
		]
	}
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
	console.log('Current state:', loadState());
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

// https://discord.js.org/docs/packages/discord.js/14.14.1/Events:Enum#/docs/discord.js/main/class/Client?scrollTo=e-messageReactionRemove
client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === '465932520266137600') {
        client.channels.cache.get('1082385963675811921').send(`**${user.username}** removed their "${reaction.emoji.name}" reaction at https://discord.com/channels/465931452085829643/465932520266137600/${reaction.message.id}`);
    }
});

client.on('interactionCreate', async interaction => {
	try {
		if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

    if (interaction.commandName === 'urmom') {
        await interaction.reply('gay');
    }

	if (interaction.commandName === 'skip-staff-meeting') {
		// EDITOR ONLY
		if (interaction.member.roles.cache.some(r => r.id === staffEditorRole) || interaction.member.roles.cache.some(r => r.id === ricardoRole)) {
			// BREAK MONTH
			const isSkipMtg_row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('yesskipstaffmtgbutton')
					.setLabel(`Yes, skip the next staff meeting!`)
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('noskipstaffmtgbutton')
					.setLabel(`Never Mind...`)
					.setStyle(ButtonStyle.Danger),
				);

			await interaction.reply({ content: `**Are you jolli-sure you want to skip the next staff meeting?** Once it is set, it cannot be unset until it auto-unsets itself a month from now OR asking Yulia to reset the bot. Note that this won't cancel the meeting after that.`, 
			components: [isSkipMtg_row], ephemeral: true, });
			// BUTTONS PARSED IN BUTTON INTERACTIONS
		} else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to set the staff meeting times!`);
		}
    }

	if (interaction.commandName === 'when-meeting') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {

			let nextMeeting = late_staff_mtg_start.nextInvocation();
			let nextMeeting_2ndthurs = late_staff_mtg_2ndthurs.nextInvocation();
			let nextMeeting_onDayEarly = late_staff_mtg_onDayEarly.nextInvocation();
			let nextMeeting_onDayHour = late_staff_mtg_onDayHour.nextInvocation();

			// check next meeting
			if (early_staff_mtg_start.nextInvocation().toDate() < late_staff_mtg_start.nextInvocation().toDate())
			{
				nextMeeting = early_staff_mtg_start.nextInvocation();
				nextMeeting_2ndthurs = early_staff_mtg_2ndthurs.nextInvocation();
				nextMeeting_onDayEarly = early_staff_mtg_onDayEarly.nextInvocation();
				nextMeeting_onDayHour = early_staff_mtg_onDayHour.nextInvocation();
			}

			await interaction.reply(`>> **Your next scheduled jolli-meeting is at ${hammerTimeHelper(nextMeeting, 'F')} which is ${hammerTimeHelper(nextMeeting, 'R')} from now**\nReminder pings for this meeting will be sent out before the date during these times:\n- ${hammerTimeHelper(nextMeeting_2ndthurs, 'F')}\n- ${hammerTimeHelper(nextMeeting_onDayEarly, 'F')}\n- ${hammerTimeHelper(nextMeeting_onDayHour, 'F')}`);
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

	if (interaction.commandName === 'when-arrw') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {
			const opentime = arrw_open.nextInvocation();
			const closetime = arrw_close.nextInvocation();
			const remindertime = arrw_reminder.nextInvocation();
			await interaction.reply({content: `Your next scheduled A Realm Reworn opening is at ${hammerTimeHelper(opentime, 'F')} which is ${hammerTimeHelper(opentime, 'R')} from now.\nThe next closing is at ${hammerTimeHelper(closetime, 'F')} which is ${hammerTimeHelper(closetime, 'R')} from now.\nA reminder to the Editors to reset this theme will be given at ${hammerTimeHelper(remindertime, 'F')} which is ${hammerTimeHelper(remindertime, 'R')} from now. \n\nThis is what will show up in the server on the next opening: `, embeds: [arrw_open_embed()]}).catch(console.error);
		}
		else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to see that!`);
		}
	}

	if (interaction.commandName === 'when-deadlines') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {
			var normalDesignerDeadlines = ({
				"name": `DESIGNER`,
				"value": `Designer Limit Lift - 20th - ${hammerTimeHelper(design_first_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_first_notif.nextInvocation(), 'R')}
					Soft Deadline - 15th - ${hammerTimeHelper(design_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_soft_notif.nextInvocation(), 'R')}
					Hard Deadline - 20th - ${hammerTimeHelper(design_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_hard_notif.nextInvocation(), 'R')}
					Indesign Turn In Deadline - 24th - ${hammerTimeHelper(design_rev_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_rev_hard_notif.nextInvocation(), 'R')}`
			  });
			var decemberDesignerDeadlines = ({
				"name": `DESIGNER (DECEMBER SPECIAL)`,
				"value": `Designer Limit Lift - Oct 15th - ${hammerTimeHelper(hol_design_first_notif.nextInvocation(), 'F')} ${hammerTimeHelper(hol_design_first_notif.nextInvocation(), 'R')}
					Soft Deadline - Dec 10th - ${hammerTimeHelper(hol_design_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(hol_design_hard_notif.nextInvocation(), 'R')}
					Hard Deadline - Dec 15th - ${hammerTimeHelper(hol_design_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(hol_design_hard_notif.nextInvocation(), 'R')}
					Indesign Turn In Deadline - Dec 19th - ${hammerTimeHelper(hol_design_rev_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(hol_design_rev_hard_notif.nextInvocation(), 'R')}`
			});

			var normalArtistDeadlines = ({
				"name": `ARTIST`,
				"value": `Hard Deadline - 8th - ${hammerTimeHelper(artist_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(artist_hard_notif.nextInvocation(), 'R')}`
			  });

			var decemberArtistDeadlines = ({
				"name": `ARTIST (DECEMBER SPECIAL)`,
				"value": `Hard Deadline - Dec 1st - ${hammerTimeHelper(hol_artist_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(hol_artist_hard_notif.nextInvocation(), 'R')}`
			  });

			var normalSheetDeadline = ({
				"name": `CONTRIBUTORS TAB`,
				"value": `Deadline - 20th - ${hammerTimeHelper(sheet_notif.nextInvocation(), 'F')} ${hammerTimeHelper(sheet_notif.nextInvocation(), 'R')}`
			});

			var decemberSheetDeadline = ({
				"name": `CONTRIBUTORS TAB`,
				"value": `Deadline - 20th - ${hammerTimeHelper(sheetdec_notif.nextInvocation(), 'F')} ${hammerTimeHelper(sheetdec_notif.nextInvocation(), 'R')}`
			});

			let isNovDec = (new Date().getMonth() === 10 || new Date().getMonth() === 11);
			let isFeb = (new Date().getMonth() === 1);
			let isEarlyMar = (new Date().getMonth() === 2 && new Date().getDate() < 6);

			const deadlineEmbed = new EmbedBuilder()
				.setColor(0xff0000)
				.setAuthor({name: 'Jollibot', iconURL: 'https://i.imgur.com/gdb9maz.jpg'})
				.setTitle('GPOSERS Staff Deadlines')
				.setDescription(`<:sparklehaps:671438024235679775> Here are the GPOSERS Staff deadlines. Note that some of the dates displayed may or may not be accurate and we follow a special schedule for the months of July, November, and December. You would be better off checking our [GPOSERS Calendar](https://teamup.com/ksy3urantc127obi1z)!`)
				.addFields(
					(isNovDec ? decemberSheetDeadline : normalSheetDeadline),
					{
						"name": `GLAM ARTIST`,
						"value": `Glam Artist Limit Lift - 15th - ${hammerTimeHelper(glamartist_limit_lift_notif.nextInvocation(), 'F')} ${hammerTimeHelper(glamartist_limit_lift_notif.nextInvocation(), 'R')}
							Check-in Deadline - 21st - ${hammerTimeHelper(glam_checkin_notif.nextInvocation(), 'F')} ${hammerTimeHelper(glam_checkin_notif.nextInvocation(), 'R')}
							Hard Deadline - 23rd - ${hammerTimeHelper(glam_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(glam_hard_notif.nextInvocation(), 'R')}
							Revision Deadline - 25th - ${hammerTimeHelper(glam_rev_notif.nextInvocation(), 'F')} ${hammerTimeHelper(glam_rev_notif.nextInvocation(), 'R')}`
					},
					  {
						"name": `AUTHOR`,
						"value": `Soft Deadline - 25th - ${hammerTimeHelper(auth_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(auth_soft_notif.nextInvocation(), 'R')}
							${isFeb ? `Hard Deadline - Feb 28th - ${hammerTimeHelper(auth_hard_feb_notif.nextInvocation(), 'F')} ${hammerTimeHelper(auth_hard_feb_notif.nextInvocation(), 'R')}` : `Hard Deadline - 30th - ${hammerTimeHelper(auth_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(auth_hard_notif.nextInvocation(), 'R')}`}`
					  },
					  {
						"name": `PHOTOGRAPHER`,
						"value": `${(isFeb || isEarlyMar) ? `CC Hard Deadline - Mar 3rd ${hammerTimeHelper(cc_photo_hard_mar_notif.nextInvocation(), 'F')} ${hammerTimeHelper(cc_photo_hard_mar_notif.nextInvocation(), 'R')}` : `CC Hard Deadline - 1st - ${hammerTimeHelper(cc_photo_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(cc_photo_hard_notif.nextInvocation(), 'R')}`}
							Hard Deadline - 8th - ${hammerTimeHelper(photo_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(photo_hard_notif.nextInvocation(), 'R')}`
					  },
					  (isNovDec ? decemberDesignerDeadlines : normalDesignerDeadlines),
					  (isNovDec ? decemberArtistDeadlines : normalArtistDeadlines),
					  {
						"name": `QA / PROOFREADER`,
						"value": `Proofreader CC Hard Deadline - 28th - ${hammerTimeHelper(proof_cc_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(proof_cc_hard_notif.nextInvocation(), 'R')}
							Proofreader Hard Deadline - 2nd ${hammerTimeHelper(proof_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(proof_hard_notif.nextInvocation(), 'R')}
							${(isFeb || isEarlyMar) ? `QA CC Photo Hard Deadline - Mar 5th ${hammerTimeHelper(qa_cc_photo_hard_mar_notif.nextInvocation(), 'F')} ${hammerTimeHelper(qa_cc_photo_hard_mar_notif.nextInvocation(), 'R')}` : `QA CC Photo Hard Deadline - 4th ${hammerTimeHelper(qa_cc_photo_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(qa_cc_photo_hard_notif.nextInvocation(), 'R')}`}
							QA Photo Hard Deadline - 11th - ${hammerTimeHelper(qa_photo_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(qa_photo_hard_notif.nextInvocation(), 'R')}
							${isNovDec ?
								`December QA Design Hard Deadline - Dec 18th - ${hammerTimeHelper(hol_design_qa_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(hol_design_qa_hard_notif.nextInvocation(), 'R')}`
								: `QA Design Hard Deadline - 23rd - ${hammerTimeHelper(design_qa_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_qa_hard_notif.nextInvocation(), 'R')}`}`
					  }
				)
				.setTimestamp()

			interaction.reply({ embeds: [deadlineEmbed] });
		}
		else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to see that!`);
		}
	}

	if (interaction.commandName === 'test-arrw') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {
			client.channels.cache.get('466296346094338060').send({content: `testing embed`,  embeds: [arrw_open_embed()] }).catch(console.error);
		}
		else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to see that!`);
		}
	}

	if (interaction.commandName === 'set-arrw') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {
			try {
				const itm = interaction.options.getString('item');
				const thm = interaction.options.getString('theme');
			
				console.log(`User input: ${thm} // ${itm}`);

				// Load current state
				console.log('Current state:', loadState());

				// Update state
				const newState = updateState({
					item: itm,
					theme: thm,
					dateSet: new Date().toISOString()
				});

				console.log('Updated state:', newState);

				await interaction.reply(`Theme set to ***${thm}*** and item set to ***${itm}***`);
			}
			catch (e) {
				console.log(e);
				await interaction.reply(`Error setting theme and item! Try again later or contact Yoolia.`);
			}
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
		if (interaction.customId === 'yesskipstaffmtgbutton') {
			// CANCEL STAFF MTG
			await pauseNextStaffMeeting(interaction);
		} else if (interaction.customId === 'noskipstaffmtgbutton') {
			// DONT CANCEL STAFF MTG
			await interaction.reply(`Gotcha! We keep the staff meeting for now.`);
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