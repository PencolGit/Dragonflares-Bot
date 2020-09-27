import {Schema, model} from 'mongoose';

const CorpSchema = Schema ({
    corpId: String,
    name: String,
    corpBattleshipLevel: {
        type: Number,
        default: 0
    },
    premium: {
        type: Boolean,
        default: false
    },
    level:{ 
        type: Number,
        default: 1
    },
    rankRoles:{type: Schema.Types.ObjectId, ref: "RankRole"},
    redStarRoles: {type: Map,
        of: String},
    battlegroups: [{type: Schema.Types.ObjectId, ref: "Battlegroup"}],
    members: [{type: Schema.Types.ObjectId, ref: "Member"}]
})

export const Corp = model("Corp", CorpSchema, "Corp")