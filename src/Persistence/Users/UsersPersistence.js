import { Query } from '../../Utils/DbConnector';

export async function StoreUserData(UserData) {
    var output = Query("INSERT INTO CORE_Clients (Id,ClienteId,Username,Password,Email,ApplicationId) VALUES (?)", UserData).catch();
    return output;
}