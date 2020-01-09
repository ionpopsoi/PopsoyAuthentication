import bcrypt from 'bcrypt';

import * as UsersPersistence from '../../Persistence/Users/UsersPersistence'

const saltRounds = 1;

export async function RegisterUsers(Input){

    var userPwd = await EncryptPWd(Input.Password);
    
    var UserData = {
        Id: 4,
        ClienteId : 1002,
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

//Delete user token
export async function DeleteUserToken(Username, Token){
    var input = {
        Username: Username,
        Token: Token
    };
    
    return await UsersPersistence.DeleteUserToken(input);
}

// Encrypt password
async function EncryptPWd(Pwd){
    return  await bcrypt.hashSync(Pwd, saltRounds);
}
