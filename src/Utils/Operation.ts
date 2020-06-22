import { OperationOutput } from '@models/Operation/OperationOutput'

import { ResponseWrapper } from '@models/Response/ResponseWrapper';

class Operation {
    public errorDescription : string[] = [];
    public errorCount = 0;

    public AddError(Error: string) {
        var output = {
            errors: this.errorCount += 1,
            errorDescription: this.errorDescription.push(Error)
        }
        return output;
    }

    public async HandleRequest(Mi: any,Mo: any) : Promise<ResponseWrapper>{

        var responseMessage : ResponseWrapper = {
            header : {
                auth: false,
                status: 200,
                timestamp: Date.now()
            },
            data : Mo
        };
        return responseMessage
    }
}

export default Operation;