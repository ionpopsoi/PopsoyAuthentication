import mysql2 from 'mysql2/promise';

import DBConnector  from '@utils/DBConnector';

import { Users } from '@models/Users/UsersModel'

class UsersPersistence{
    public internalDB = new DBConnector();

    public async RegisterUser(UserData: Users) : Promise<boolean> {    
        var output = await this.internalDB.Connection().query("INSERT INTO CORE.Clients SET ?", UserData);
        return output;
    }

    public async GetUserData(Username: string){
        var output = await this.internalDB.Connection().query("SELECT * FROM CORE.Clients Where (?)", Username);



        return output[0];
    }

 
}

export default UsersPersistence;