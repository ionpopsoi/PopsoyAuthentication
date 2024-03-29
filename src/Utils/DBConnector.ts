import mysql from 'mysql2/promise';


class DBConnector {
    Connection() {
        var DBConnection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_DATABASE
        });
        return DBConnection;
    }
}

export default DBConnector;