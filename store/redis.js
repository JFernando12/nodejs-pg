const redis = require("redis");

const client = redis.createClient({
    socket: {
        host: "redis-11681.c15.us-east-1-2.ec2.cloud.redislabs.com",
        port: 11681,
    },
    password: "c6BGcxhLgu8zpnKzpgNwwvLJ3FQrdcnB"
})

client.on('error', err => {
    console.log('Error ' + err);
});

client.connect();

const get = async(table) => {
    try {
        const result = await client.get(table);
        return JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
} 

const add = async(table, data) => {
    try {
        let key = table;
        if(data && data.id) {
            key = table + "_" + data.id;
        }
        await client.setEx(key, 10, JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    get,
    add
}