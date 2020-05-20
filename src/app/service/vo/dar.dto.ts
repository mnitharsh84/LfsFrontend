export class DarDTO {


    public id?: number;
    public type: string = "FULL";// This is hard coded as we need to take wheather It is going to be a full service or just service request.
    public createdBy: string;
    public mobilenumber?: string;
    public status: string;
    public darDate: number;
    public darSlot: string;
    public city: string;
    public  state: string;
    public  area?: string;
    public  address: string;
    public  description?: string;
    public  isOnDemand: boolean= true;
    public  darCost?: number;
}
