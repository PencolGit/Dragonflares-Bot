let TechData = require("../../../Database/Hades' Star/techs.json")
let { RichEmbed } = require("discord.js")
let Player = require("../../../player.js")
let Battlegroup = require("../../../battlegroup.js")

module.exports = {
    name: "listbattlegroup",
    category: "hades' star",
    subcategory: "battlegroups",
    description: "Show's this guild's battlegroups.",
    usage: "&listbattlegroup (battlegroupname), no stating the name will show which battlegroups you've set",
    run: async (client, message, args) => {
        let battlegroupEmbed = new RichEmbed().setColor("RANDOM")
        
        let messagesplit = message.content.split(" ")
        if(!messagesplit[1]) {
            battlegroupEmbed.setTitle("**Battlegroups**")
            battlegroupEmbed.setFooter("You can specify a battlegroup name and get a detailed composition of the team")
            if(message.mentions.users > 0) return message.channel.send("You can't mention a user for this command.")
            let battlegroup1name = client.battlegroups.get(`${message.guild.id}`, "battlegroup1.name")
            let battlegroup1captain = client.battlegroups.get(`${message.guild.id}`, "battlegroup1.captain")
            let battlegroup2name = client.battlegroups.get(`${message.guild.id}`, "battlegroup2.name")
            let battlegroup2captain = client.battlegroups.get(`${message.guild.id}`, "battlegroup2.captain")

            if(!battlegroup1name) {
                if(!battlegroup2name){
                    return message.channel.send("There are no Battlegroups set in this Corp!")
                }
                else{
                    battlegroupEmbed.addField(`*${battlegroup2name}*`, `Captain: ${client.playersPrimeDB.get(`${battlegroup2captain}`, "name")}`)
                }
            }
            else {
                if(!battlegroup2name){
                    battlegroupEmbed.addField(`*${battlegroup1name}*`, `Captain: ${client.playersPrimeDB.get(`${battlegroup1captain}`, "name")}`)
                }
                else {
                    battlegroupEmbed.addField(`*${battlegroup2name}*`, `Captain: ${client.playersPrimeDB.get(`${battlegroup2captain}`, "name")}`)
                    battlegroupEmbed.addField(`*${battlegroup1name}*`, `Captain: ${client.playersPrimeDB.get(`${battlegroup1captain}`, "name")}`)
                }
            }
            return message.channel.send(battlegroupEmbed)
        }
    }
}