const Discord = require('discord.js');

exports.run = async (client, message) => {
  const yasak = client.emojis.cache.get('811958245094326372');
  const elmas = client.emojis.cache.get('838420877330219088');
  const ok = client.emojis.cache.get('836253273169854464');
  const onay = client.emojis.cache.get('816747101803380786');
      message.delete()
  const embed = new Discord.MessageEmbed()
     .setColor('RANDOM')
    .setDescription(`
 ${elmas}***<@${message.author.id}> Yardımcı Oluyoruz Size :)***
${ok} ** Sıralama Komutu:    \`.sıralama\`**
${ok} ** Seviye Komutu  \`.seviye [@ETİKET]\`**
${ok} ** Seviye Ekleme Komutu:    \`.seviye-ekle [@ETİKET] [MİKTAR]\`**
${ok} ** Seviye Silme Komutu:    \`.seviye-sil [@ETİKET] [MİKTAR]\`**

${elmas} \`Log Sistemi\` ${onay}
`,true)
        .setFooter(`Umarım Yardımcı Olabilmişimdir...`)
message.channel.send(embed).then(message => {setTimeout(() => {message.delete()}, 60000);message.react('810500661829042176')})  
  
};

exports.conf = {
  enabled: true,
  aliases: ['syardım'],
  permLevel: 0,
};

exports.help = {
  name: "seviye-yardım",
  description: "Bot bulunduğunuz odaya girer.",
  usage: "seviye-yardım",
};