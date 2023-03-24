const Discord = require('discord.js'); 
const bot = new Discord.Client();

const { MessageEmbed } = require('discord.js');
const { builtinModules } = require('module');
require('discord-buttons')(bot);

const EventEmitter = require('events')
const emitter = new EventEmitter()

const fs = require('fs');
const path = require('path');

require('events').EventEmitter.prototype._maxListeners = 40;
require('events').defaultMaxListeners = 40;

let config = require('./config.json');
//let list = require('./list.json');


const { brotliCompressSync } = require('zlib');


let token = config.token; 
let prefix = config.prefix;

//let online = list.online;
//let offline = list.offline;
//let afk = list.afk;


bot.on('ready', () => { 
    console.log('============================');
    console.log(`| ${bot.user.username} - Successfully activated`);
    console.log('============================');
});


// БД

const Users = {
    'АЙИД ПОЛЬЗОВАТЕЛЯ': '`КАКОЕ ИМЯ И РАНГ БУДЕТ ОТОБРОЖАТЬСЯ`',
}


// БД


bot.on("message", message => {

    if (message.content === (config.prefix + 'онлайн')) {

        var onlineRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("online"));
        if (!onlineRole) return;
        
        const args = message.content.trim().split(/ +/g);

        message.guild.members.cache.get(message.author.id).roles.add(onlineRole);

        role = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("online"));
        let rolemembers;
        if(role.members.size > 20) rolemembers = role.members.map(e=> `${Users[e.id]}\n`).slice(0,20).join("") + ` and ${role.members.size - 20} more members...`
        if(role.members.size < 20) rolemembers = role.members.map(e => `${Users[e.id]}\n`).join("")


        const online = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle(`✅ ${Users[message.author.id]} в сети`)
        message.channel.send(online)

        message.channel.send('[✅] Загрузка списка..').then(msg => {
                msg.delete({ timeout: 2000});
            })
    }
})


bot.on("message", message => {
    if (message.content === '[✅] Загрузка списка..') {

        const args = message.content.trim().split(/ +/g);

        role = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("online"));
        let rolemembers;
        if(role.members.size > 20) rolemembers = role.members.map(e=> `${Users[e.id]}\n`).slice(0,20).join("") + ` and ${role.members.size - 20} more members...`
        if(role.members.size < 20) rolemembers = role.members.map(e => `${Users[e.id]}\n`).join("")

        setTimeout(function(){
            const onlineBot = new Discord.MessageEmbed()
            .setColor("#2F3136")
            //.setTitle(`✅ ${message.author.username} в сети`)
            .setDescription(`На сервере: \n ${rolemembers}`)
            .setTimestamp();

            message.channel.send(onlineBot)
        }, 3000);

    }
})




bot.on("message", message => {
    if (message.content === (config.prefix + 'вышел')) {

        var onlineRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("online"));
        if (!onlineRole) return;
        
        const args = message.content.trim().split(/ +/g);

        message.guild.members.cache.get(message.author.id).roles.remove(onlineRole);

        role = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("online"));
        let rolemembers;
        if(role.members.size > 20) rolemembers = role.members.map(e=> `${Users[e.id]}\n`).slice(0,20).join("") + ` and ${role.members.size - 20} more members...`
        if(role.members.size < 20) rolemembers = role.members.map(e => `${Users[e.id]}\n`).join("")

        const online = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle(`❌ ${Users[message.author.id]} вышел`)
        message.channel.send(online)

        message.channel.send('[❌] Загрузка списка..').then(msg => {
                msg.delete({ timeout: 2000});
            })
    }
})


bot.on("message", message => {
    if (message.content === '[❌] Загрузка списка..') {

        const args = message.content.trim().split(/ +/g);

        role = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("online"));
        let rolemembers;
        if(role.members.size > 2) rolemembers = role.members.map(e=> `${Users[e.id]}\n`).slice(0,2).join("") + ` and ${role.members.size - 20} more members...`
        if(role.members.size < 20) rolemembers = role.members.map(e => `${Users[e.id]}\n`).join("")

        setTimeout(function(){
            const offlibeBot = new Discord.MessageEmbed()
            .setColor("#2F3136")
            //.setTitle(`❌ ${message.author.username} вышел`)
            .setDescription(`На сервере: \n ${rolemembers}`)
            .setTimestamp();

            message.channel.send(offlibeBot)
        }, 3000);

    }
})


bot.on("message", message => {
    if (message.content === (config.prefix + 'афк')) {

        var onlineRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("online"));
        if (!onlineRole) return;
        
        const args = message.content.trim().split(/ +/g);

        message.guild.members.cache.get(message.author.id).roles.remove(onlineRole);

        role = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("online"));
        let rolemembers;
        if(role.members.size > 20) rolemembers = role.members.map(e=> `${Users[e.id]}\n`).slice(0,20).join("") + ` and ${role.members.size - 20} more members...`
        if(role.members.size < 20) rolemembers = role.members.map(e => `${Users[e.id]}\n`).join("")

        const online = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle(`⚠️ ${Users[message.author.id]} афк`)
        message.channel.send(online)

        message.channel.send('[⚠️] Загрузка списка..').then(msg => {
                msg.delete({ timeout: 2000});
            })
    }
})


bot.on("message", message => {
    if (message.content === '[⚠️] Загрузка списка..') {

        const args = message.content.trim().split(/ +/g);

        role = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("online"));
        let rolemembers;
        if(role.members.size > 2) rolemembers = role.members.map(e=> `${Users[e.id]}\n`).slice(0,2).join("") + ` and ${role.members.size - 20} more members...`
        if(role.members.size < 20) rolemembers = role.members.map(e => `${Users[e.id]}\n`).join("")

        setTimeout(function(){
            const offlibeBot = new Discord.MessageEmbed()
            .setColor("#2F3136")
            //.setTitle(`❌ ${message.author.username} вышел`)
            .setDescription(`На сервере: \n ${rolemembers}`)
            .setTimestamp();

            message.channel.send(offlibeBot)
        }, 3000);

    }
})

////////////////////////////


bot.login(token);
