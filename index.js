const {
    ShardingManager
} = require('discord.js');
const {
    token
} = require('./config.json');
const manager = new ShardingManager('./app.js', {
    token: token
});

manager.spawn();
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));