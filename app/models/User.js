const db = require('../components/database')

async function upsertUser(user) {
    return db.user.upsert({
        where: {
            discord_id: user.id
        },
        create: {
            discord_id: user.id,
            name: user.username,
            discord_score: 1
        },
        update: {
            discord_id: user.id,
            name: user.username,
            discord_score: {
                increment : 1
            }
        }
    })
}

async function getUserWithClanwarProfiles(userId) {
    return db.user.findUnique({
        where: {
            id: userId
        },
        include : {
            clanwarProfiles : {
                include : {
                    discipline: true
                }
            }
        }
    })
}

module.exports = {
  upsertUser,
  getUserWithClanwarProfiles
}