import { Component, OnInit } from '@angular/core';
import { HubConnection, IHubConnectionOptions } from '@aspnet/signalr';
import {LightSignalRService} from '../services/lightSignalR.service';
import {LightBulbModel} from '../models/lightBulb.model';


@Component({
  selector: 'app-light-control',
  templateUrl: './light-control.component.html',
  styleUrls: ['./light-control.component.css']
})
export class LightControlComponent implements OnInit {
  lightBulbList :LightBulbModel[];
  
  constructor(private lightSignalRService: LightSignalRService) {
    this.subscribeToEvents();   
   }

  ngOnInit() {  
  }
  
  public lightUp(statusOfLightBulb: boolean,lightBulbId: number) {
    this.lightSignalRService.changeLightState(statusOfLightBulb,lightBulbId);
  }   

  private subscribeToEvents(): void {
   this.lightSignalRService.statusOfLightListChanged.subscribe(()=>{
   console.log(this.lightSignalRService.lightBulbList);
   this.lightBulbList = this.lightSignalRService.lightBulbList;
  })}
}
