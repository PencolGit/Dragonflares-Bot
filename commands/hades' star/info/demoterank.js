let TechData = require("../../../Database/Hades' Star/techs.json")
let Player = require("../../../player.js")

module.exports = {
    name: "demoterank",
    category: "hades' star",
    subcategory: "info",
    description: "Demotes a player rank in a Corp.",
    usage: "[command | alias]",
    run: async (client, message, args) => {
        let targetb
        let user = message.mentions.users.first()
        if(!user){
            targetb = message.guild.member(message.author)
        }
        else targetb = message.guild.member(user)

        client.playersDB.ensure(`${targetb.id}`, new Player(targetb, message))

        const mentionedusers = message.mentions.users
        if(mentionedusers.size > 1) return message.channel.send("You've mentioned more than one user!")
        const member = message.guild.member(mentionedusers.first())
        let author = message.guild.member(message.author)
        if(!member) return message.channel.send("You haven't targeted anyone to demote!")
        let memberguild = client.playersDB.get(`${author.id}`, "corp")
        if(!(memberguild === message.guild.id)) return message.channel.send("You are not in your corp's server!")
        let authorrank = client.playersDB.get(`${author.id}`, "rank")
        let memberrank = client.playersDB.get(`${member.id}`, "rank")
        if(authorrank === "Officer") {
            if(memberrank === "Member") return message.channel.send("You cannot demote this person any more! He's a Member!")
            if(memberrank === "Officer") return message.channel.send("You cannot demote a fellow officer!")
            if(memberrank === "First Officer") return message.channel.send("Yeah, nice try, you can't demote your First Officer!")
            if(memberrank === "SeniorMember") {

            }
        }
    }
}