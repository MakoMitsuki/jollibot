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
