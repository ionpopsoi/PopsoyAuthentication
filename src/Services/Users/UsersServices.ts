import bcrypt from 'bcrypt';

import UsersPersistence from '@persistence/UsersPersistences'

import { Users } from '@models/Users/UsersModel'

import Operation from '@utils/Operation';

class UsersServices {
    
    public async RegisterNewUser(request: any) : Promise<any> {
        var output = new Operation();

        var userData = request.body;
        
        if(request.body.Email == null){
            output.AddError("Email needs to have value.");
            return output;
        }
        //Verificar se os dados estão corrector && encriptar password
        var userPWDEncrypted = await this.EncryptPWD(userData.Password);
    
        var newUserData : Users = {
            ClientId: 12,
            ApplicationId: userData.ApplicationId,
            Email: userData.Email,
            Password: userPWDEncrypted,
            Username: userData.Username,
        }
    
        return await new UsersPersistence().RegisterUser(newUserData);
    }
    
    public async GetUserData(Username: any, ClientId?: boolean): Promise<Users> {
        return await new UsersPersistence().GetUserData(Username);
    }

    private async EncryptPWD(password: string): Promise<string> {
        return await bcrypt.hashSync(password, 1);
    }
}

export default UsersServices;
