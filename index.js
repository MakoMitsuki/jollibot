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
		const newDTime = new Date(d.getFullYear(), d.getMonth(), (d.getDate() + 1), 5, 59);
		const epoch = parseInt(newDTime.getTime()/1000);
		return `<t:${epoch}:${format}>`;
	}catch (error) {
		console.log(`[[GET MIDNIGHT SAME DAY ERROR - d = ${d} // format = ${format}]] ${error}`);
		return d;
	}
}

// ================================================================== POSETOBER
const buildEmbed = (dayNum, name, imgUrl) => {

    const emb = {
        "title": `GPOSERS POSETOBER DAY ${dayNum}`,
        "description": `Today's prompt is **${name}**. Show us your screenshots inspired by this Halloween cult classic!`,
        "color": 0xff3700,
        "image": {
          "url": `${imgUrl}`,
          "height": 0,
          "width": 0
        }
      }

    return emb;
}

const channel_posetober = process.env.CHANNEL_POSETOBER;
const posetoberPing = process.env.POSETOBER_PING;
const posetoberMonth = 9;
const posetoberHour = 8;

var day1 = schedule.scheduleJob({month: posetoberMonth, date: 1, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(1, "Edward Scizzorhands", "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/FD2777D8E9328B0795EECF64EE3E98D71AFD11AAA66C9E91237FD4B7AC6C701D/scale?width=1200&aspectRatio=1.78&format=jpeg")] }).catch(console.error);
  });
var day2 = schedule.scheduleJob({month: posetoberMonth, date: 2, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(2, "Sleepy Hollow", "https://flxt.tmsimg.com/assets/p24356_v_v13_aq.jpg")] }).catch(console.error);
});
var day3 = schedule.scheduleJob({month: posetoberMonth, date: 3, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(3, "Jennifer's Body", "https://m.media-amazon.com/images/I/91u88H6AVfL.jpg")] }).catch(console.error);
});
var day4 = schedule.scheduleJob({month: posetoberMonth, date: 4, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(4, "Midsommar", "https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_.jpg")] }).catch(console.error);
});
var day5 = schedule.scheduleJob({month: posetoberMonth, date: 5, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(5, "Halloween", "https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg")] }).catch(console.error);
});
var day6 = schedule.scheduleJob({month: posetoberMonth, date: 6, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(6, "A Nightmare on Elm Street", "https://flxt.tmsimg.com/assets/p8572_v_v9_ab.jpg")] }).catch(console.error);
});
var day7 = schedule.scheduleJob({month: posetoberMonth, date: 7, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(7, "Friday the 13th", "https://m.media-amazon.com/images/M/MV5BNWMxYTYzYWQtNGZmNy00MTg5LTk1N2MtNzQ5NjQxYjQ5NTJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg")] }).catch(console.error);
});
var day8 = schedule.scheduleJob({month: posetoberMonth, date: 8, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(8, "The Lost Boys", "https://m.media-amazon.com/images/M/MV5BMWEzNmUxZTMtZjY0My00OGNmLWIyNDctODM2YzZjM2YwZWEwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg")] }).catch(console.error);
});
var day9 = schedule.scheduleJob({month: posetoberMonth, date: 9, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(9, "Practical Magic", "https://flxt.tmsimg.com/assets/p21981_v_v9_ab.jpg")] }).catch(console.error);
});
var day10 = schedule.scheduleJob({month: posetoberMonth, date: 10, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(10, "Scream", "https://flxt.tmsimg.com/assets/p18852_p_v10_al.jpg")] }).catch(console.error);
});
var day11 = schedule.scheduleJob({month: posetoberMonth, date: 11, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(11, "Bram Stoker's Dracula", "https://m.media-amazon.com/images/M/MV5BNjcyMDZlMTktYTIxOC00ZWFhLWJkYzgtNWNiYjAwYTFkNjIyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg")] }).catch(console.error);
});
var day12 = schedule.scheduleJob({month: posetoberMonth, date: 12, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(12, "Beetlejuice", "https://m.media-amazon.com/images/S/pv-target-images/5d98336b89ef46a12c267849effb128f514c3b15fec7a9ccd3b4c3cc0e15c294.jpg")] }).catch(console.error);
});
var day13 = schedule.scheduleJob({month: posetoberMonth, date: 13, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(13, "The Craft" , "https://m.media-amazon.com/images/M/MV5BZTBkMWE1NGItZTgxMi00ZTE0LWIzZjAtNzQ5ZGZlZTQxN2EwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg")] }).catch(console.error);
});
var day14 = schedule.scheduleJob({month: posetoberMonth, date: 14, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(14, "Hocus Pocus" , "https://imageio.forbes.com/specials-images/imageserve/5f6121066a58c8dc0288f91c/0x0.jpg")] }).catch(console.error);
});
var day15 = schedule.scheduleJob({month: posetoberMonth, date: 15, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(15, "Halloweentown" , "https://www.denofgeek.com/wp-content/uploads/2020/10/Halloweentown-Crazy-Details-Disney-Original.jpg")] }).catch(console.error);
});
var day16 = schedule.scheduleJob({month: posetoberMonth, date: 16, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(16, "The Shining" , "https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/21/09/the-shining-2.jpg")] }).catch(console.error);
});
var day17 = schedule.scheduleJob({month: posetoberMonth, date: 17, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(17, "Suspiria" , "https://m.media-amazon.com/images/M/MV5BYmI5YmEwYjAtYTJhOS00M2U5LTg0OTQtNTZmMzI1NzM0ZTU1XkEyXkFqcGdeQXVyODE1MjMyNzI@._V1_.jpg")] }).catch(console.error);
});
var day18 = schedule.scheduleJob({month: posetoberMonth, date: 18, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(18, "Sabrina the Teenage Witch" , "https://ntvb.tmsimg.com/assets/p7896527_b_h8_aa.jpg")] }).catch(console.error);
});
var day19 = schedule.scheduleJob({month: posetoberMonth, date: 19, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(19, "Nightmare Before Christmas", "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/D2CBF9E937934C0C3D3E24F514A4A804EC2620B1C99F1EB8BDE83687FCD8AFEE/scale?width=1200&aspectRatio=1.78&format=jpeg")] }).catch(console.error);
});
var day20 = schedule.scheduleJob({month: posetoberMonth, date: 20, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(20, "Shaun of the Dead", "https://ntvb.tmsimg.com/assets/p34914_v_h10_ac.jpg")] }).catch(console.error);
});
var day21 = schedule.scheduleJob({month: posetoberMonth, date: 21, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(21, "Interview with the Vampire", "https://variety.com/wp-content/uploads/2022/09/IWTV_GROUP_GALLERY_LestatClaudiaLouis_0025_RT.jpg")] }).catch(console.error);
});
var day22 = schedule.scheduleJob({month: posetoberMonth, date: 22, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(22, "The Conjuring", "https://musicart.xboxlive.com/7/8ac41100-0000-0000-0000-000000000002/504/image.jpg")] }).catch(console.error);
});
var day23 = schedule.scheduleJob({month: posetoberMonth, date: 23, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(23, "The Cabin in the Woods", "https://m.media-amazon.com/images/M/MV5BNTUxNzYyMjg2N15BMl5BanBnXkFtZTcwMTExNzExNw@@._V1_.jpg")] }).catch(console.error);
});
var day24 = schedule.scheduleJob({month: posetoberMonth, date: 24, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(24, "Young Frankenstein", "https://m.media-amazon.com/images/M/MV5BMTgwMDAwMDkyMF5BMl5BanBnXkFtZTcwMTE5NTQ4Mw@@._V1_.jpg")] }).catch(console.error);
});
var day25 = schedule.scheduleJob({month: posetoberMonth, date: 25, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(25, "The Addams Family", "https://media.distractify.com/brand-img/Xuuq_vAtA/0x0/theaddamsfamily-1668613689800.jpg")] }).catch(console.error);
});
var day26 = schedule.scheduleJob({month: posetoberMonth, date: 26, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(26, "Monster House", "https://flxt.tmsimg.com/assets/p159533_v_h10_aa.jpg")] }).catch(console.error);
});
var day27 = schedule.scheduleJob({month: posetoberMonth, date: 27, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(27, "Corpse Bride", "https://jer-cin.org.il/sites/default/files/styles/slide_show/public/corpse_bride.jpg")] }).catch(console.error);
});
var day28 = schedule.scheduleJob({month: posetoberMonth, date: 28, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(28, "The Exorcist", "https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/10/29/13/The-Exorcist.jpg")] }).catch(console.error);
});
var day29 = schedule.scheduleJob({month: posetoberMonth, date: 29, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(29, "REC", "https://londonhorrorsociety.co.uk/wp-content/uploads/2022/07/Rec-1.jpg")] }).catch(console.error);
});
var day30 = schedule.scheduleJob({month: posetoberMonth, date: 30, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(30, "Casper The Friendly Ghost", "https://149370944.v2.pressablecdn.com/wp-content/uploads/2019/09/casper-header-2160x1200.jpg")] }).catch(console.error);
});
var day31 = schedule.scheduleJob({month: posetoberMonth, date: 31, hour: posetoberHour, minute: 0, second: 0, tz: 'America/New_York'}, function(){
	client.channels.cache.get(channel_posetober).send({content: `<@&${posetoberPing}>`,  embeds: [buildEmbed(31, "Silent Hill", "https://i.pinimg.com/originals/27/0c/7d/270c7dab59fedc58b93a41b6c0a6baaa.jpg")] }).catch(console.error);
});

// =================================================================================================================================================

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
var ccopen = schedule.scheduleJob({date: 28, hour: 12, minute: 0, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_community_collection).send(`<@&${contestAlertsPing}> **[Submissions for the Community Collection are now OPEN!]**`).catch(console.error);
  //console.log(`Community Collection opened.`);
});

// COMMUNITY COLLECTION CLOSE
var ccclose = schedule.scheduleJob({date: 14, hour: 0, minute: 30, tz: 'America/New_York'}, function(){
  client.channels.cache.get(channels_community_collection).send(`<@&${contestAlertsPing}> **[COMMUNITY COLLECTION SUBMISSIONS ARE NOW CLOSED!]**`).catch(console.error);
  //console.log(`Community Collection closed.`);
});

// ======================= NEXT MONTHLY MEETING

/* ===== ORIG
var rule_second_notif_start = new schedule.RecurrenceRule();
  rule_second_notif_start.tz = 'America/New_York';
	rule_second_notif_start.month = months;
	rule_second_notif_start.date = second_sat_dates;
	rule_second_notif_start.dayOfWeek = 6;
	rule_second_notif_start.hour = 17;
	rule_second_notif_start.minute = 0;
	rule_second_notif_start.second = 0;
var staff_meeting_second_start = schedule.scheduleJob(rule_second_notif_start, function(){
	client.channels.cache.get(channel_staff_announce).send(`**Our <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting is starting now!**\n\nhttps://media.tenor.com/c3pKaYLittEAAAAd/jollibee-chicken-joy.gif`).catch(console.error);
	//console.log(`1st Monthly Staff Meeting Announced.`);
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
    client.channels.cache.get(channel_staff_announce).send(
		`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting this weekend:** ${hammerTimeHelper(staff_meeting_second_start.nextInvocation(), 'F')} ${hammerTimeHelper(staff_meeting_second_start.nextInvocation(), 'R')}`
		).catch(console.error);
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
    client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting really soon!** It starts ${hammerTimeHelper(staff_meeting_second_start.nextInvocation(), 'R')} at ${hammerTimeHelper(staff_meeting_second_start.nextInvocation(), 'f')}`).catch(console.error);
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
    client.channels.cache.get(channel_staff_announce).send(`**Reminder: We have a <@&${staffPing}>/<@&${hiatusPing}>-wide jolli-meeting today ${hammerTimeHelper(staff_meeting_second_start.nextInvocation(), 'R')}!**`).catch(console.error);
    //console.log(`1st Monthly Staff Meeting Announced Hour Before.`);
});
*/

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

// ===============================================================

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
		client.channels.cache.get(channel_staff_announce).send(`<@&${glamArtistPing}> **soft jolli-deadline is today**. Make sure you have submitted at least a rough draft of your work by the end of the day.`).catch(console.error);
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
		client.channels.cache.get(channel_staff_announce).send(`<@&${artistPing}> **soft jolli-deadline for all magazine-related artwork is today**. Make sure you have started all artwork before the end of the day.`).catch(console.error);
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
		client.channels.cache.get(channel_staff_announce).send(`<@&${artistPing}> **hard jolli-deadline for all magazine-related artwork is today**. Make sure you have submitted all artwork by the end of the day.`).catch(console.error);
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
		client.channels.cache.get(channel_staff_announce).send(`<@&${authorPing}> **soft jolli-deadline is today**. Make sure you have submitted at least a rough draft of your work by the end of the day.\n\n<@&${glamArtistPing}> **hard jolli-deadline is today**. Make sure you have submitted your completed works by the end of the day.`).catch(console.error);
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
		client.channels.cache.get(channel_staff_announce).send(`<@&${authorPing}> **hard jolli-deadline is today**. Make sure you have submitted your completed works by the end of the day.`).catch(console.error);
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
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **soft jolli-deadline for internal Community Couture articles is today**. Make sure you have started all internal Community Couture photography work before the end of the day.\n\n<@&${proofreaderPing}> **hard jolli-deadline for proofreading internal CC glamour sheets is today**! Make sure you have finished proofreading them by the end of the day.`).catch(console.error);
		//console.log(`Photographers CC Soft Deadline Announced.`);
	});

var rule_proof_cc_hard_notif = new schedule.RecurrenceRule();
	rule_proof_cc_hard_notif.tz = 'America/New_York';
	rule_proof_cc_hard_notif.month = months;
	rule_proof_cc_hard_notif.date = 9;
	rule_proof_cc_hard_notif.hour = 12;
	rule_proof_cc_hard_notif.minute = 0;
	rule_proof_cc_hard_notif.second = 0;
	  var proof_cc_hard_notif = schedule.scheduleJob(rule_proof_cc_hard_notif, function(){
		  client.channels.cache.get(channel_staff_announce).send(`<@&${proofreaderPing}> **hard jolli-deadline to proofread all Community Couture articles is today**. Make sure that all the CC entries have been checked by three proofreaders by the end of today`).catch(console.error);
		  //console.log(`Proofreaders CC Hard Deadline Announced.`);
	  });

var rule_photo_soft_notif = new schedule.RecurrenceRule();
  rule_photo_soft_notif.tz = 'America/New_York';
	rule_photo_soft_notif.month = months;
	rule_photo_soft_notif.date = 10;
	rule_photo_soft_notif.hour = 12;
	rule_photo_soft_notif.minute = 0;
	rule_photo_soft_notif.second = 0;
	var photo_soft_notif = schedule.scheduleJob(rule_photo_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${photographerPing}> **soft jolli-deadline for all non-Community Couture articles is today**. Make sure you have started all photography work before the end of the day.\n\n<@&${photographerPing}> **hard jolli-deadline for internal Community Couture articles is today**. Make sure you have submitted all photography work for internal Community Couture articles by the end of the day.`).catch(console.error);
		//console.log(`Photographers Soft Deadline Announced.`);
	});

var rule_qa_cc_hard_notif = new schedule.RecurrenceRule();
	rule_qa_cc_hard_notif.tz = 'America/New_York';
	rule_qa_cc_hard_notif.month = months;
	rule_qa_cc_hard_notif.date = 12;
	rule_qa_cc_hard_notif.hour = 12;
	rule_qa_cc_hard_notif.minute = 0;
	rule_qa_cc_hard_notif.second = 0;
	  var qa_cc_hard_notif = schedule.scheduleJob(rule_qa_cc_hard_notif, function(){
		  client.channels.cache.get(channel_staff_announce).send(`<@&${qaPing}> **hard jolli-deadline for QA for all Community Couture photos is today**! Ensure that all CC photos have **three** QA before the end of the day. Tag your relevant photographer if there are any urgent changes needed.`).catch(console.error);
		  //console.log(`QA CC Photo Hard Deadline Announced.`);
	  });

var rule_photo_hard_notif = new schedule.RecurrenceRule();
  rule_photo_hard_notif.tz = 'America/New_York';
	rule_photo_hard_notif.month = months;
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
	rule_proof_hard_notif.month = months;
	rule_proof_hard_notif.date = 13;
	rule_proof_hard_notif.hour = 12;
	rule_proof_hard_notif.minute = 1;
	rule_proof_hard_notif.second = 0;
	var proof_hard_notif = schedule.scheduleJob(rule_proof_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${proofreaderPing}> **hard jolli-deadline is today**! Make sure you have finished proofreading all articles by the end of the day.`).catch(console.error);
		//console.log(`Proofreaders Hard Deadline Announced.`);
	});

var rule_qa_photo_hard_notif = new schedule.RecurrenceRule();
	rule_qa_photo_hard_notif.tz = 'America/New_York';
	rule_qa_photo_hard_notif.month = months;
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
	rule_design_soft_notif.month = months;
	rule_design_soft_notif.date = 19;
	rule_design_soft_notif.hour = 12;
	rule_design_soft_notif.minute = 0;
	rule_design_soft_notif.second = 0;
	var design_soft_notif = schedule.scheduleJob(rule_design_soft_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **soft jolli-deadline is today**. Make sure you have submitted at least a rough draft or example of your designs by the end of the day.`).catch(console.error);
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
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **hard jolli-deadline is today**! Make sure you have submitted your completed designs by the end of the day.`).catch(console.error);
		//console.log(`Designers Hard Deadline Announced.`);
	});

var rule_design_qa_hard_notif = new schedule.RecurrenceRule();
	rule_design_qa_hard_notif.tz = 'America/New_York';
	rule_design_qa_hard_notif.month = months;
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
	rule_design_ti_hard_notif.month = months;
	rule_design_ti_hard_notif.hour = 12;
	rule_design_ti_hard_notif.date = 24;
	rule_design_ti_hard_notif.minute = 0;
	rule_design_ti_hard_notif.second = 0;
	var design_ti_hard_notif = schedule.scheduleJob(rule_design_ti_hard_notif, function(){
		client.channels.cache.get(channel_staff_announce).send(`<@&${designerPing}> **revision jolli-deadline is today**! Ensure that your InDesign packages are uploaded to the Drive with the right revisions! **Front Cover Designer** should also ensure that the social media promos are done and submitted to #social-media before magazine release.`).catch(console.error);
		//console.log(`Designers QA Deadline Announced.`);
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
		client.channels.cache.get(channel_collaborators).send(`<@${edeonPing}> **It is time to renew the jolli-blood pact.**`).catch(console.error);
		//console.log(`Eorzea Collection ping sent.`);
	});

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
	proof_cc_hard_notif.cancelNext(true);
    photo_soft_notif.cancelNext(true);
    photo_hard_notif.cancelNext(true);
	qa_cc_hard_notif.cancelNext(true);
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
		name: 'when-cc',
		description: '[STAFF DISCORD ONLY] CCTest'
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

	//client.channels.cache.get(channel_posetober).send(`<@&${posetoberPing}> test ping`).catch(console.error);
    var day1When = day1.nextInvocation();
    var day15When = day15.nextInvocation();
    var day19When = day19.nextInvocation();
    client.channels.cache.get('466296346094338060').send(`**Posetober has been set up.** It will ping the 1st one on ${hammerTimeHelper(day1When, 'F')} and ping the 15th one on ${hammerTimeHelper(day15When, 'F')}`).catch(console.error);
	client.channels.cache.get('466296346094338060').send(`Test for the **19TH DAY (Nightmare Before Christmas)** which should ping on ${hammerTimeHelper(day19When, 'F')}`).catch(console.error);
	client.channels.cache.get('466296346094338060').send({content: `<@${yuliaPing}>`,  embeds: [buildEmbed(19, "Nightmare Before Christmas", "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/D2CBF9E937934C0C3D3E24F514A4A804EC2620B1C99F1EB8BDE83687FCD8AFEE/scale?width=1200&aspectRatio=1.78&format=jpeg")] }).catch(console.error);
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

			// check next meeting
			if (staff_mtg_start_even.nextInvocation().toDate() < staff_mtg_start_odd.nextInvocation().toDate())
			{
				nextMeeting = staff_mtg_start_even.nextInvocation();
				ffMeeting = staff_mtg_start_odd.nextInvocation();
				nextMeeting_2ndthurs = staff_mtg_2ndthurs_even.nextInvocation();
				nextMeeting_onDayEarly = staff_mtg_onDayEarly_even.nextInvocation();
				nextMeeting_onDayHour = staff_mtg_onDayHour_even.nextInvocation();
			}

			await interaction.reply(`>> **Your next scheduled jolli-meeting is at ${hammerTimeHelper(nextMeeting, 'F')} which is ${hammerTimeHelper(nextMeeting, 'R')} from now**\nReminder pings for this meeting will be sent out before the date during these times:\n- ${hammerTimeHelper(nextMeeting_2ndthurs, 'F')}\n- ${hammerTimeHelper(nextMeeting_onDayEarly, 'F')}\n- ${hammerTimeHelper(nextMeeting_onDayHour, 'F')}\n\nThe following meeting after that won't be till ${hammerTimeHelper(ffMeeting, 'F')} which is ${hammerTimeHelper(ffMeeting, 'R')} from now `);
		}
		else {
			await interaction.reply(`**STOP RIGHT THERE!** You're not allowed to see that!`);
		}
	}

    if (interaction.commandName === 'when-cc') {
		if (interaction.guildId === staffDiscordId || interaction.guildId === testDiscordId) {
			const opentime = ccopen.nextInvocation();
			const closetime = ccclose.nextInvocation();
			await interaction.reply(`Your next scheduled CCOpen is at ${hammerTimeHelper(opentime, 'F')} which is ${hammerTimeHelper(opentime, 'R')} from now. Closing is at ${hammerTimeHelper(closetime, 'F')} which is ${hammerTimeHelper(closetime, 'R')} from now.`);
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
							${getMidnightSameDay(glam_soft_notif.nextInvocation(), 'F')} ${getMidnightSameDay(glam_soft_notif.nextInvocation(), 'R')}
							Hard Deadline - 5th - ${hammerTimeHelper(auth_soft_glam_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(auth_soft_glam_hard_notif.nextInvocation(), 'R')}
							${getMidnightSameDay(auth_soft_glam_hard_notif.nextInvocation(), 'F')} ${getMidnightSameDay(auth_soft_glam_hard_notif.nextInvocation(), 'R')}`
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
							Soft Deadline - 19th - ${hammerTimeHelper(design_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_soft_notif.nextInvocation(), 'R')}
							Hard Deadline - 22nd - ${hammerTimeHelper(design_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_hard_notif.nextInvocation(), 'R')}
							Indesign Turn In Deadline - 24th - ${hammerTimeHelper(design_ti_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(design_ti_hard_notif.nextInvocation(), 'R')}`
					  },
					  {
						"name": `ARTIST`,
						"value": `Soft Deadline - 10th - ${hammerTimeHelper(artist_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(artist_soft_notif.nextInvocation(), 'R')}
							Hard Deadline - 13th - ${hammerTimeHelper(artist_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(artist_hard_notif.nextInvocation(), 'R')}`
					  },
					  {
						"name": `QA / PROOFREADER`,
						"value": `Proofreader In-house CC Hard Deadline - 7th - ${hammerTimeHelper(photo_cc_soft_notif.nextInvocation(), 'F')} ${hammerTimeHelper(photo_cc_soft_notif.nextInvocation(), 'R')}
							Proofreader CC Hard Deadline - 9th - ${hammerTimeHelper(proof_cc_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(proof_cc_hard_notif.nextInvocation(), 'R')}
							QA Photo CC Soft Deadline - 12th - ${hammerTimeHelper(qa_cc_hard_notif.nextInvocation(), 'F')} ${hammerTimeHelper(qa_cc_hard_notif.nextInvocation(), 'R')}
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