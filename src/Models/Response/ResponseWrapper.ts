export interface ResponseWrapper {
    header : header,
    data: any
}
interface header{
    auth: boolean,
    status: number,
    timestamp?: number,
}

interface data {

}
