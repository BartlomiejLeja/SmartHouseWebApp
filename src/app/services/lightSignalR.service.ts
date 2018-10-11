import { Injectable,Component, OnInit, EventEmitter } from '@angular/core';
import { HubConnection, IHubConnectionOptions } from '@aspnet/signalr';
import {LightBulbModel} from '../models/lightBulb.model';

@Injectable()
export class LightSignalRService implements OnInit {
    public hubConnection: HubConnection;
    
   // public statusOfLightChaned: EventEmitter < Boolean > ;  
   public statusOfLightListChanged: EventEmitter < LightBulbModel[]> ;  

    public isLightOn:boolean;
    public lightNumber : number;
    lightBulbList :LightBulbModel[];

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
        this.hubConnection = new HubConnection('https://signalirserver20180827052120.azurewebsites.net/LightApp');
       
        this.hubConnection.on('StatisticData',(timeOn:number,timeOff:number)=>{
          console.log('Time on '+timeOn + 'Time off ' + timeOff);
        });

        this.hubConnection.on('ChangeLightState',(isOn:boolean,lightNumber: number)=>{
            this.isLightOn=isOn; 
        })

        this.hubConnection.on('SendLightState', 
            (lightID:number,lightStatus:boolean)=>{
            console.log('Light number is ' + lightID+'lightStatus is' + lightStatus)
            this.lightBulbList.forEach((lightBulb) => {if(lightBulb.ID==lightID){
                lightBulb.LightStatus=lightStatus;
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
                  this.hubConnection.invoke('CheckStatusOfLights',true);
              })
              .catch(err => {
                  console.log('Error while establishing connection') 
              })
          console.log(this.hubConnection);
     }
}