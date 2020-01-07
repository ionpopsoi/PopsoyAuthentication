import { DbProvider, Query } from '../../Utils/DbConnector';

var DB = DbProvider();

export async function StoreUserData(UserData) {
    var output = await DB.query("INSERT INTO CORE_Clients SET ?", UserData);
    return output;
}