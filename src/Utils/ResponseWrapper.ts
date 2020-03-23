import { ResponseWrapper } from '@models/Response/ResponseWrapper';

class ResponseWrapperService {
    /**
     * Wrappe the output into a readeable object
     * @param {any} Header
     * @param {any} Body
     * @returns {ResponseWrapper}
     */
    public WrappeMessage(Header: any, Body: any){
        var newStatus = 200;

        if(Body.errorCount > 0) {
            newStatus = 500;
        }

        var responseMessage : ResponseWrapper = {
            header : {
                auth: false,
                status: newStatus,
                timestamp: Date.now()
            },
            data: {
                Body
            }
        };
        return responseMessage
    }
}

export default ResponseWrapperService;