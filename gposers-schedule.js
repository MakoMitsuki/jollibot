require('dotenv').config();
const channel_staff_announce = process.env.CHANNEL_STAFF_ANNOUNCE;

module.exports = {
    test: function (client, schedule) {
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
    },
    staff: function() {
        const second_thurs_dates = [6, 7, 8, 9, 10, 11, 12];
        const second_sat_dates = [8, 9, 10, 11, 12, 13, 14];
        const third_thurs_dates = [13, 14, 15, 16, 17, 18, 19];
        const third_sat_dates = [15, 16, 17, 18, 19, 20, 21];
        const months = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11];

        // 1st Staff Monthly Meeting Announcement
        var rule_second_notif_preday = new schedule.RecurrenceRule();
        	rule_second_notif_preday.month = months;
        	rule_second_notif_preday.date = second_thurs_dates;
        	rule_second_notif_preday.dayOfWeek = 4;
        	rule_second_notif_preday.hour = 12;
        	rule_second_notif_preday.minute = 0;
        	rule_second_notif_preday.second = 0;
        	rule_second_notif_preday.tz = 'America/New_York';
        	var staff_meeting_second_notif_preday = schedule.scheduleJob(rule_second_notif_preday, function(){
        		client.channels.get(channel_staff_announce).send(`**Reminder: We have a** <@&466300432478896148>**-wide meeting Saturday at 5pm EST / 10pm BST! If you haven't already, make sure you have enabled and double checked notifications for each relevant recurring meeting in Google Calendar:** <https://calendar.google.com>`).catch(console.error);
        		//console.log(`1st Monthly Staff Meeting Announced Day Prior.`);
        	});
        var rule_second_notif_day = new schedule.RecurrenceRule();
        	rule_second_notif_day.month = months;
        	rule_second_notif_day.date = second_sat_dates;
        	rule_second_notif_day.dayOfWeek = 6;
        	rule_second_notif_day.hour = 12;
        	rule_second_notif_day.minute = 0;
        	rule_second_notif_day.second = 0;
        	rule_second_notif_day.tz = 'America/New_York';
        	var staff_meeting_second_notif_day = schedule.scheduleJob(rule_second_notif_day, function(){
        		client.channels.get(channel_staff_announce).send(`**Reminder: We have a** <@&466300432478896148>**-wide meeting today at 5pm EST / 10pm BST! If you haven't already, make sure you have enabled and double checked notifications for each relevant recurring meeting in Google Calendar:** <https://calendar.google.com>`).catch(console.error);
        		//console.log(`1st Monthly Staff Meeting Announced Day Of.`);
        	});
        var rule_second_notif_hour = new schedule.RecurrenceRule();
        	rule_second_notif_hour.month = months;
        	rule_second_notif_hour.date = second_sat_dates;
        	rule_second_notif_hour.dayOfWeek = 6;
        	rule_second_notif_hour.hour = 16;
        	rule_second_notif_hour.minute = 0;
        	rule_second_notif_hour.second = 0;
        	rule_second_notif_hour.tz = 'America/New_York';
        	var staff_meeting_second_notif_hour = schedule.scheduleJob(rule_second_notif_hour, function(){
        		client.channels.get(channel_staff_announce).send(`**Reminder: We have a** <@&466300432478896148>**-wide meeting today in one hour! If you haven't already, make sure you have enabled and double checked notifications for each relevant recurring meeting in Google Calendar:** <https://calendar.google.com>`).catch(console.error);
        		//console.log(`1st Monthly Staff Meeting Announced Hour Before.`);
        	});
        var rule_second_notif_start = new schedule.RecurrenceRule();
        	rule_second_notif_start.month = months;
        	rule_second_notif_start.date = second_sat_dates;
        	rule_second_notif_start.dayOfWeek = 6;
        	rule_second_notif_start.hour = 17;
        	rule_second_notif_start.minute = 0;
        	rule_second_notif_start.second = 0;
        	rule_second_notif_start.tz = 'America/New_York';
        	var staff_meeting_second_start = schedule.scheduleJob(rule_second_notif_start, function(){
        		client.channels.get(channel_staff_announce).send(`<@&466300432478896148>**-wide is starting now! If you haven't already, make sure you have enabled and double checked notifications for each relevant recurring meeting in Google Calendar:** <https://calendar.google.com>`).catch(console.error);
        		//console.log(`1st Monthly Staff Meeting Announced.`);
        	});

        var rule_design_first_notif = new schedule.RecurrenceRule();
        	rule_design_first_notif.month = months;
        	rule_design_first_notif.date = 1;
        	rule_design_first_notif.hour = 0;
        	rule_design_first_notif.minute = 0;
        	rule_design_first_notif.second = 0;
        	rule_design_first_notif.tz = 'America/New_York';
        	var design_first_notif = schedule.scheduleJob(rule_design_first_notif, function(){
        		client.channels.get(channel_staff_announce).send(`<@&466303902879318026> Today is the 1st. **The limit on picking up articles has now been removed for the month.**`).catch(console.error);
        		//console.log(`Designer 1st Notification Announced.`);
        	});
        var rule_glam_auth_soft_notif = new schedule.RecurrenceRule();
        	rule_glam_auth_soft_notif.month = months;
        	rule_glam_auth_soft_notif.date = 5;
        	rule_glam_auth_soft_notif.hour = 12;
        	rule_glam_auth_soft_notif.minute = 0;
        	rule_glam_auth_soft_notif.second = 0;
        	rule_glam_auth_soft_notif.tz = 'America/New_York';
        	var glam_auth_soft_notif = schedule.scheduleJob(rule_glam_auth_soft_notif, function(){
        		client.channels.get(channel_staff_announce).send(`<@&466303792892346368> <@&466381392477945857> **soft deadline is today**. Make sure you have submitted at least a rough draft of your work by the end of the day.`).catch(console.error);
        		//console.log(`Authors Glam Artists Soft Deadline Announced.`);
        	});
        var rule_glam_auth_hard_notif = new schedule.RecurrenceRule();
        	rule_glam_auth_hard_notif.month = months;
        	rule_glam_auth_hard_notif.date = 11;
        	rule_glam_auth_hard_notif.hour = 12;
        	rule_glam_auth_hard_notif.minute = 0;
        	rule_glam_auth_hard_notif.second = 0;
        	rule_glam_auth_hard_notif.tz = 'America/New_York';
        	var glam_auth_hard_notif = schedule.scheduleJob(rule_glam_auth_hard_notif, function(){
        		client.channels.get(channel_staff_announce).send(`<@&466303792892346368> <@&466381392477945857> **hard deadline is today**. Make sure you have submitted your completed works by the end of the day.`).catch(console.error);
        		//console.log(`Authors Glam Artists Hard Deadline Announced.`);
        	});
        var rule_proof_photo_hard_notif = new schedule.RecurrenceRule();
        	rule_proof_photo_hard_notif.month = months;
        	rule_proof_photo_hard_notif.date = 13;
        	rule_proof_photo_hard_notif.hour = 12;
        	rule_proof_photo_hard_notif.minute = 0;
        	rule_proof_photo_hard_notif.second = 0;
        	rule_proof_photo_hard_notif.tz = 'America/New_York';
        	var proof_photo_hard_notif = schedule.scheduleJob(rule_proof_photo_hard_notif, function(){
        		client.channels.get(channel_staff_announce).send(`<@&466303476029194240> **hard deadline is today**. Make sure you have submitted all photography work by the end of the day.\n\n<@&466304003790340127> **hard deadline is today**. Make sure you have finished proofreading all articles by the end of the day.`).catch(console.error);
        		//console.log(`Proofreaders and Photographers Hard Deadline Announced.`);
        	});

        var rule_photo_soft_notif = new schedule.RecurrenceRule();
        	rule_photo_soft_notif.month = months;
        	rule_photo_soft_notif.date = 10;
        	rule_photo_soft_notif.hour = 12;
        	rule_photo_soft_notif.minute = 0;
        	rule_photo_soft_notif.second = 0;
        	rule_photo_soft_notif.tz = 'America/New_York';
        	var photo_soft_notif = schedule.scheduleJob(rule_photo_soft_notif, function(){
        		client.channels.get(channel_staff_announce).send(`<@&466303476029194240> **soft deadline is today**. Make sure you have submitted all Community Couture photography work before the end of the day.`).catch(console.error);
        		//console.log(`Photographers Soft Deadline Announced.`);
        	});

        var rule_design_soft_notif = new schedule.RecurrenceRule();
        	rule_design_soft_notif.month = months;
        	rule_design_soft_notif.date = 19;
        	rule_design_soft_notif.hour = 12;
        	rule_design_soft_notif.minute = 0;
        	rule_design_soft_notif.second = 0;
        	rule_design_soft_notif.tz = 'America/New_York';
        	var design_soft_notif = schedule.scheduleJob(rule_design_soft_notif, function(){
        		client.channels.get(channel_staff_announce).send(`<@&466303902879318026> **soft deadline is today**. Make sure you have submitted at least a rough draft or example of your designs by the end of the day.`).catch(console.error);
        		//console.log(`Designers Soft Deadline Announced.`);
        	});
        var rule_design_hard_notif = new schedule.RecurrenceRule();
        	rule_design_hard_notif.month = months;
        	rule_design_hard_notif.date = 22;
        	rule_design_hard_notif.hour = 12;
        	rule_design_hard_notif.minute = 0;
        	rule_design_hard_notif.second = 0;
        	rule_design_hard_notif.tz = 'America/New_York';
        	var design_hard_notif = schedule.scheduleJob(rule_design_hard_notif, function(){
        		client.channels.get(channel_staff_announce).send(`<@&466303902879318026> **hard deadline is today**. Make sure you have submitted your completed designs by the end of the day.`).catch(console.error);
        		//console.log(`Designers Hard Deadline Announced.`);
        	});
        /*var rule_eorzea_collection_notif = new schedule.RecurrenceRule();
        	rule_eorzea_collection_notif.month = months;
        	rule_eorzea_collection_notif.date = 1;
        	rule_eorzea_collection_notif.hour = 12;
        	rule_eorzea_collection_notif.minute = 0;
        	rule_eorzea_collection_notif.second = 0;
        	var eorzea_collection_notif = schedule.scheduleJob(rule_eorzea_collection_notif, function(){
        		client.channels.get(channel_collaborators).send(`<@49294177699102720> **It is time to renew the blood pact.**`).catch(console.error);
        		//console.log(`Eorzea Collection ping sent.`);
        	});
        var rule_community_couture_notif = new schedule.RecurrenceRule();
        	rule_community_couture_notif.month = months;
        	rule_community_couture_notif.date = 28;
        	rule_community_couture_notif.hour = 12;
        	rule_community_couture_notif.minute = 0;
        	rule_community_couture_notif.second = 0;
        	var community_couture_notif = schedule.scheduleJob(rule_community_couture_notif, function(){
        		client.fetchUser('122959829856813056',false).then(user => {
                user.send("Write the Community Couture contest message.")
            }).catch(console.error);
        		//console.log(`Community Couture DM sent.`);
        	});*/
    }
};