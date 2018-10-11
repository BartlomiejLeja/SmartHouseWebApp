export class LightBulbModel{
    LightStatus:boolean;
    ID: number;
    Name: string;
    BulbOnTimeInMinutesPerDay  : number;
    BulbOffTimeInMinutesPerDay : number;

    constructor(lightStatus:boolean,
        ID: number,
        Name: string)
    {
    this.Name = name;this.ID=ID;this.LightStatus=lightStatus;
    }
}