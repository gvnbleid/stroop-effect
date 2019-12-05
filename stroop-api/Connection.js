const redis = require("redis")

module.exports = {
    createConnection : (port) => {
        return new Promise((resolve, reject) => {
            const client = redis.createClient(port)

            client.on('connect', () => {
                resolve(client)
            })

            client.on('error', () => {
                reject("Error: Failed to connect")
            })
        })
    }
}