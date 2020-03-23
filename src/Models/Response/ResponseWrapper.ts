export interface ResponseWrapper {
    header : header,
    data: data
}
interface header{
    auth: boolean,
    status: number,
    timestamp?: number,
}

interface data {

}
