const { Pool } = require("pg");
const config = require("../config.js");
const pool = new Pool(config.db);

pool.connect((err) => {
    if(err){
        console.log(err)
    } else {
        console.log("Database connected")
    }
})

const get = async(table) => {
    const result = await pool.query(`SELECT * FROM ${table}`);
    return result.rows;
}

const getOne = async(table, data) => {
    const column = Object.keys(data)[0];
    const value = Object.values(data)[0];
    console.log(column, value);
    const result = await pool.query(`SELECT * FROM ${table} WHERE ${column} = '${value}'`);
    return result.rows[0];
}

const add = async(table, data) => {
    try {
        const values = Object.values(data);
        const columns = Object.keys(data);
        for (let i=0; i < values.length; i++) {
            values[i] = "'" + values[i] +"'";
        }
        await pool.query(`INSERT INTO ${table} (${columns}) VALUES (${values})`);
    } catch (error) {
        throw new Error ("Introduce dato correctos");
    }
    
}

const remove = async(table, id) => {
    await pool.query(`DELETE FROM ${table} WHERE id='${id}'`);
}

const getJoin = async(table_1, table_2, column_1, column_2, id) => {
    const result = await pool.query(`SELECT * FROM ${table_1} INNER JOIN ${table_2} ON ${column_1}=${column_2} WHERE ${Object.keys(id)[0]}='${Object.values(id)[0]}'`);
    return result.rows;
}

module.exports = {
    get,
    getOne,
    add,
    remove,
    getJoin
}