import { Injectable,Component, OnInit, EventEmitter } from '@angular/core';
import { HubConnection, IHubConnectionOptions } from '@aspnet/signalr';
import {LightBulbModel} from '../models/lightBulb.model';
import { DatePipe } from '@angular/common';

@Injectable()
export class LightSignalRService implements OnInit {
    public hubConnection: HubConnection;
    
   public statusOfLightListChanged: EventEmitter < LightBulbModel[]> ;  

    public lightNumber : number;
    lightBulbList :LightBulbModel[];
    lightBulb :LightBulbModel;

     constructor(){
      this.statusOfLightListChanged = new EventEmitter <LightBulbModel[] > ();
     }

     ngOnInit() {
     }

     public changeLightState(statusOfLightBulb: boolean,lightBulbId:number) : void
     {
        this.hubConnection.invoke('ChangeLightState',statusOfLightBulb,lightBulbId);
     }

     public StartSignalRConnection(): void{
     this.hubConnection = new HubConnection('https://signalirserver20181021093049.azurewebsites.net/LightApp');
      // this.hubConnection = new HubConnection('http://localhost:51690/LightApp');
       
        this.hubConnection.on('StatisticData',(timeOn:number,timeOff:number)=>{
          console.log('Time on '+timeOn + 'Time off ' + timeOff);
        });

        this.hubConnection.on('SendLightState', 
            (lightID:number,lightStatus:boolean,dateTime:Date,serializedLightBulbModel: string)=>{
            this.lightBulb=JSON.parse(serializedLightBulbModel);
            console.log('Light number is ' + lightID+'lightStatus is' + lightStatus)
            this.lightBulbList.forEach((lightBulb) => {
                if(lightBulb.ID==lightID){
                    Object.assign(lightBulb,this.lightBulb)
                };
            })
        });

        this.hubConnection.on('SendInitialLightCollection',(lightCollection:any)=>{
            this.lightBulbList=JSON.parse(lightCollection);
            console.log( this.lightBulbList);
            this.statusOfLightListChanged.emit(this.lightBulbList);
        });

        this.hubConnection.start()
              .then(() => {
                  console.log('Hub connection started')
              })
              .catch(err => {
                  console.log('Error while establishing connection') 
              })
          console.log(this.hubConnection);
     }
}