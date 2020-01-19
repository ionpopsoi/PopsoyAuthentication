import { RegisterTransaction } from 'transcationservice';
import { DbProvider } from '../Utils/DbConnector';

export function Transaction(req,res,next){
    RegisterTransaction(req, DbProvider());
    next();
}