import bcrypt from 'bcrypt';

import * as UsersPersistence from '../../Persistence/Users/UsersPersistence'

const saltRounds = 1;

export async function RegisterUsers(Input){

    var userPwd = await EncryptPWd(Input.Password);
    
    var UserData = {
        Id: 2,
        ClienteId : 1001,
        Username : Input.Username,
        Password : userPwd,
        Email : Input.Email,
        ApplicationId : Input.ApplicationId
    };

    var storage = UsersPersistence.StoreUserData(UserData);
    
    return storage;
}

//Get User Data
export async function GetUserData(username, clienteId) {
    var input = {
        Username : username
    };
    
    return await UsersPersistence.GetUserData(input);
}

// Encrypt password
async function EncryptPWd(Pwd){
    return  await bcrypt.hashSync(Pwd, saltRounds);
}
