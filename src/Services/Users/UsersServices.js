import bcrypt from 'bcrypt';

import * as UsersPersistence from '../../Persistence/Users/UsersPersistence'

const saltRounds = 1;

export async function RegisterUsers(Input){

    var userPwd = await EncryptPWd(Input.Password);
    
    var UserData = {
        ClientId : await GenerateClientId(),
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
        Username: Username
    };
    
    return await UsersPersistence.DeleteUserToken(input);
}

// Encrypt password
async function EncryptPWd(Pwd){
    return  await bcrypt.hashSync(Pwd, saltRounds);
}

async function GenerateClientId() {
    var generatedClientId = await GenerateNumberClienteId();
    var input = {
        ClientId: generatedClientId
    };
    var result = await UsersPersistence.GetUserData(input);
    while(result.lenght > 0){
        var generatedClientId = await GenerateNumberClienteId();
        var input = {
            ClienteId: generatedClientId
        };
        var result = await UsersPersistence.GetUserData(input);
        generatedClientId = await GenerateNumberClienteId();
    }
    return generatedClientId;
}

async function GenerateNumberClienteId(){
    return Math.floor(Math.random() * (2000 - 1000) + 1000);
}
