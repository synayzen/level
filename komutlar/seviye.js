const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");

exports.run = async (client, msg, args) => {
  msg.delete();
  const yasak = client.emojis.cache.get('820061702870925342');
  if (msg.channel.id !== '801730953055567922') return msg.channel.send(`${yasak} **Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));
  let u = msg.mentions.users.first() || msg.author;

        if(u.bot === true) {
                const embed = new Discord.MessageEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
  
  var g = "50"
  
  var Canvas = require('canvas')
        var canvas = Canvas.createCanvas(750, 240)
        var ctx = canvas.getContext('2d');
        const avatarURL = u.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        const { body } = await request.get(avatarURL);
        const avatar = await Canvas.loadImage(body);
  
//  ctx.fillStyle = "#000000";
//  ctx.fill()
//        ctx.fillRect(25, 20, 700, 200)  
  
  
  
//        ctx.fillStyle = "rgba(0, 0, 0, 0.30)";
//        ctx.fill()
//        ctx.fillRect(0, 0, 750, 240)
  
        var re = "db3b3b"
  
  var xp = db.fetch(`puan_${u.id + msg.guild.id}`);
  var lvl = db.fetch(`seviye_${u.id + msg.guild.id}`);  

        let vUser = msg.guild.member(msg.mentions.users.first());
        const emoji = client.emojis.cache.get('702138649151668284');
        let sira = ''
        const sorted = msg.guild.members.cache.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`seviye_${b.user.id + msg.guild.id}`) - db.fetch(`seviye_${a.user.id + msg.guild.id}`) });
        const top10 = sorted.splice(0, msg.guild.members.cache.size)
        const mappedID = top10.map(s => s.user.id);
        for(var i = 0; i < msg.guild.members.cache.size; i++) {
                if(mappedID[i] === u.id) {
                        sira += `${i + 1}`
                }
        }

           var de = 1.6
        ctx.beginPath()
        ctx.fillStyle = "#999999";
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 36.15, 250 * de, 37.5);
        ctx.arc(257 + 18.5 + 250 * de, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `#${re}`;
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 36.25, xp * de, 37.5);
        ctx.arc(257 + 18.5 + xp * de, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = `#${re}`;
        ctx.font = '28px Impact';
        ctx.textAlign = "right";
        ctx.fillText(`Sıralama #${sira} | Seviye ${lvl || 0}`, 670, 70);
        ctx.font = '20px Impact';
        ctx.textAlign = "right";
        ctx.fillText(`${xp || 0} / 150 XP`, 670, 100);
  ctx.fillStyle = `#bfbfbf`;
  ctx.font = '28px Impact';
        ctx.textAlign = "left";
        ctx.fillText(`${u.tag}`, 270, 150)
        ctx.beginPath();
        ctx.lineWidth = 8;
  ctx.fill()
        ctx.lineWidth = 8;
        ctx.arc(55 + 80, 80 + 80, 80, 0, 2 * Math.PI, false);
        ctx.clip();
        ctx.drawImage(avatar, 55, 80, 160, 160);
    
        msg.channel.send({files:[{attachment:canvas.toBuffer(),name:"seviye.png"}]})
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['seviye'],
  permLevel: 0,
};

exports.help = {
  name: 'seviye',
  description: '',
  usage: 'seviye'
};