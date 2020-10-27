const {
    ShardingManager
} = require('discord.js');

const manager = new ShardingManager('./app.js', {
    token: process.env.DISCORD_TOKEN
});

manager.spawn();
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));