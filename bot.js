const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require('quick.db');

require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.TOKEN)


// SEVIYE \\
const dba = require('quick.db');
client.on("message", async msg => {
      const emoji = client.emojis.cache.get('833453160713814056');
      let guncelseviye = await db.fetch(`seviye_${msg.author.id + msg.guild.id}`,);

      const seviyeatlama = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`
      <a:Assassins_pixelkalp:800605439322488872> <@${msg.author.id}> *** Tebrikler *** Assassins <:Balksz8:837753310899208223>
      *** Bir seviye atladın! seviye *** ${guncelseviye ? guncelseviye : '0'} *** oldun *** <a:twich:836538116461690911>
`);  
  
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  if (msg.content.length > 7) {
    dba.add(`puan_${msg.author.id + msg.guild.id}`, 5);
  }
  
  
  if (dba.fetch(`puan_${msg.author.id + msg.guild.id}`) > 150) {
  
  
  let sohbetlog = msg.guild.channels.cache.find(guild => guild.name === "💬𝖠𝗌𝗌𝖺𝗌𝗌𝗂𝗇𝗌-𝖢𝗁𝖺𝗍");    
  msg.guild.channels.cache.get(sohbetlog.id).send(seviyeatlama)
    
  let seviyelog = msg.guild.channels.cache.find(guild => guild.name === 'level-info');    
  msg.guild.channels.cache.get(seviyelog.id).send(seviyeatlama)    
    
    dba.add(`seviye_${msg.author.id + msg.guild.id}`, 1);

    dba.delete(`puan_${msg.author.id + msg.guild.id}`);
  }
});
// SEVIYE \\

//-----------------BOTUN_SESLİDE_KALMASI---------------------//

client.on("ready", () => {
client.channels.cache.get("801730967910875188").join()
})

//--------------------------------------------------------------------------------------------------------------//


//-----------------BOTUN_SESLİDE_KALMASI

const Discord1 = require('discord.js');
const client2 = new Discord.Client();
client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
console.log("Streamstatus synayzen")

client.user.setActivity(`Synayzen lvar 💕 Assassin's Creed Family`, {
type: "STREAMING",
url: "https://www.twitch.tv/synayzen"})
    .then(presence => console.log(`HAZIR KAPTAN ASSASSİNS!  ${presence.game ? presence.game.none : '🛠'}`))
    .catch(console.error);
});

