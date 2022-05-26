const axios = require("axios");

class createRemote {
    constructor(url) {
        this.url = url;
    }

    async get(table) {
        const result = await axios.get(this.url + table)
        return result.data.body;
    }

    async add (table, data) {
        try {
            await axios.post(this.url + table, data);
        } catch (error) {
            console.log(error);
        }
    }
}



module.exports = createRemote