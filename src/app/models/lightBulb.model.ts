import { DatePipe } from "@angular/common";

export class LightBulbModel{
    LightStatus:boolean;
    ID: number;
    Name: string;
    BulbOnTimeInMinutesPerDay  : number;
    BulbOffTimeInMinutesPerDay : number;
    TimeOn: Date;
    TimeOff: Date;

    constructor(lightStatus:boolean,
        ID: number,
        Name: string)
    {
    this.Name = name;this.ID=ID;this.LightStatus=lightStatus;
    }
}