const uuid = require("uuid").v4;
const table_posts = "posts";
const table_users = "users";

const controller = (store) => {
    const add = async(user, text) => {
        const post = {
            id: uuid(),
            text,
            user_id: user
        }
        await store.add(table_posts, post);
    }

    const myposts = async(user) => {
        await store.getJoin(table_posts, table_users, "user_id", "id", { user_id:user });
    }

    const get = async() => {
        return await store.get(table_posts);
    }
    
    return({
        add,
        myposts,
        get
    })
}

module.exports = controller;