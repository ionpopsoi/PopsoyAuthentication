import { DbProvider, Query } from '../../Utils/DbConnector';

var DB = DbProvider();

export async function StoreUserData(UserData) {
    var output = await DB.query("INSERT INTO CORE.Clients SET ?", UserData);
    return output;
}

export async function DeleteUserToken(input) {
    var output = await DB.query("DELETE Token FROM CORE.Clients WHERE (?)");
    return output;
}

export async function GetUserData(UserData){
    var output = await DB.query("SELECT * FROM CORE.Clients WHERE (?)", UserData);
    if(output[0].lenght > 0){
        return output = {
            result: "User not found."
        }
    }
    return output[0];
}