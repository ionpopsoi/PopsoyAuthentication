import mysql from 'mysql2/promise';

var DBConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE
});

export function DbProvider() {
    return DBConnection;
}

export async function Query(query, params) {
    if(params != null) {
        var output = await DBConnection.query(query, [params]);
    } else {
        var output = await DBConnection.query(query);
    }
    return output[0];
}