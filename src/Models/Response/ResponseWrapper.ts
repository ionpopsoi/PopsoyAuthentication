export interface ResponseWrapper {
    header : header,
    data: data
}
interface header{
    auth: boolean,
    timestamp?: number,
}

interface data {

}
