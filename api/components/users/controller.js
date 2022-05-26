const uuid = require("uuid").v4;
const auth = require("../auth/index")
const table_users = "users";
const table_follow = "follow";

const controller = (store, cache) => {
    const get = async() => {
        let data = await cache.get(table_users);
        if (data) {
            console.log("Estaba en caché");
            return data
        }
        else {
            console.log("No estaba en caché");
            data = await store.get(table_users)
            await cache.add(table_users, data);
            return data;    
        }
    }

    const getOne = async(id) => {
        return await store.getOne(table_users, {id: id});
    }

    const add = async(data) => {
        const id = uuid();
        const user = {
            id,
            name: data.name,
            username: data.username
        }
        await store.add(table_users, user)
        await auth.register({...user, password: data.password})
    }

    const remove = async(id) => {
        await store.remove(table_users, id);
    }

    const follow = async(user_from, user_to) => {
        try {
            const data = {
                user_from,
                user_to
            }
            await store.add(table_follow, data);
        } catch (error) {
            throw new Error ("Introduce datos");
        }
    }

    const following = async(user_to) => {
        const result = await store.getJoin(table_follow, table_users, "user_from", "id", { user_to: user_to });
        return result;
    }

    return ({
        get,
        getOne,
        add,
        remove,
        follow,
        following
    })
}

module.exports = controller;
