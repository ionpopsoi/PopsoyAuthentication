import { OperationOutput } from '@models/Operation/OperationOutput'

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
}

export default Operation;