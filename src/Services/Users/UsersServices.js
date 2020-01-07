import bcrypt from 'bcrypt';

import * as UsersPersistence from '../../Persistence/Users/UsersPersistence'

const saltRounds = 1;

export async function RegisterUsers(Input){

    var userPwd = await EncryptPWd(Input.Password);
    var UserData = {
        Id: 1,
        ClienteId : 1000,
        Username : Input.Username,
        Password : userPwd,
        Email : Input.Email,
        ApplicationId : Input.ApplicationId
    }

    var storage = UsersPersistence.StoreUserData(UserData);
    

}

async function EncryptPWd(Pwd){
    // Encrypt password
    var ss = await bcrypt.hashSync(Pwd, saltRounds);

    return ss;
}

export async function GetUserData(username, clienteId) {

}