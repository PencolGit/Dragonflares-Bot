import { MemberCommand } from './MemberCommand';
import { Member, Corp } from '../../database';
import { MessageEmbed } from 'discord.js';
import { findBestMatch } from 'string-similarity';
import { confirmResult } from '../../utils';

export class PlayerProfileCommand extends MemberCommand {
    constructor(plugin) {
        super(plugin, {
            name: 'playerprofile',
            aliases: ['prof'],
            description: "Shows info about yourself or a certain player.",
            usage: "&playerprofile (player)"
        });
    }

    async run(message, args) {
        let target
        let CorpMember
        const user = message.mentions.users.first()
        if (!user) {
            if (!args[0]) {
                target = message.guild.member(message.author)
                CorpMember = (await Member.findOne({ discordId: target.id.toString() }).populate("Corp").catch(err => console.logg(err)))
            } else {
                let corp = await Corp.findOne({ corpId: message.guild.id.toString() }).populate('members').exec();
                let memberslist = new Map(corp.members.map(t => [t.name, t]))
                const rate = findBestMatch(args[0], [...memberslist.keys()]);
                if (!await confirmResult(message, args[0], rate.bestMatch.target))
                    return;
                CorpMember = (await Member.findOne({ discordId: memberslist.get(rate.bestMatch.target).discordId.toString() }).populate("Corp").populate("techs").catch(err => console.logg(err)))
            }
        }
        else {
            target = message.guild.member(user)
            CorpMember = (await Member.findOne({ discordId: target.id.toString() }).populate("Corp").catch(err => console.logg(err)))
        }

        if (!CorpMember) {
            if (!user) return message.channel.send("You were never part of a Corporation! You must join one to have a profile!")
            else return message.channel.send("This Member isn't part of any Corporation, therefore has no profile.")
        }
        else {
            return setTimeout(this.createProfile, 500, message, CorpMember);
        }
    }

    createProfile = async (message, CorpMember) => {
        let ProfileEmbed = new MessageEmbed().setColor("RANDOM")
        ProfileEmbed.setTitle(`Player: **${CorpMember.name}**`)

        let playerrank = CorpMember.rank
        let playercorp = CorpMember.Corp.name
        let playertimezone = CorpMember.timezone
        let playerrslevel = CorpMember.rslevel
        let playerwhitestaron = CorpMember.wsStatus

        ProfileEmbed.addField(`*Corporation*`, `${playercorp}`)
        ProfileEmbed.addField(`*Rank*`, playerrank)
        ProfileEmbed.addField(`*Time Zone*`, `GMT ${playertimezone}`)
        ProfileEmbed.addField(`*Red Star level*`, `${playerrslevel}`)
        ProfileEmbed.addField(`*Avaible for White Stars*`, `${playerwhitestaron}`)
        ProfileEmbed.setFooter("For the techs this player has, use &playertech, for their white star battleship, use &playerbattleship")

        return message.channel.send(ProfileEmbed)
    }
}