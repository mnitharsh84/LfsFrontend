export class RestApiServiceResponse {
    public successful: boolean;
    public message?: string;
    public errors?: string[] = [];
    public warning?: string[] =  [];
}