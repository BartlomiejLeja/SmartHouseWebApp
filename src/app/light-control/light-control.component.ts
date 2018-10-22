import { Component, OnInit } from '@angular/core';
import { HubConnection, IHubConnectionOptions } from '@aspnet/signalr';
import {LightSignalRService} from '../services/lightSignalR.service';
import {LightBulbModel} from '../models/lightBulb.model';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/startWith";

@Component({
  selector: 'app-light-control',
  templateUrl: './light-control.component.html',
  styleUrls: ['./light-control.component.css']
})
export class LightControlComponent implements OnInit {
  lightBulbList :LightBulbModel[];
  public cols: Observable<number>;
  
  constructor(public lightSignalRService: LightSignalRService,
    private observableMedia: ObservableMedia) {
    this.subscribeToEvents();   
   }

  ngOnInit() {  
    const grid = new Map([
      ["xs", 1],
      ["sm", 2],
      ["md", 2],
      ["lg", 3],
      ["xl", 3]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.observableMedia.asObservable()
      .map(change => {
        console.log(change);
        console.log(grid.get(change.mqAlias));
        return grid.get(change.mqAlias);
      })
      .startWith(start);
  }
  
  public lightUp(statusOfLightBulb: boolean,lightBulbId: number) {
    this.lightSignalRService.changeLightState(statusOfLightBulb,lightBulbId);
  }   

  private subscribeToEvents(): void {
   this.lightSignalRService.statusOfLightListChanged.subscribe(()=>{
   this.lightBulbList = this.lightSignalRService.lightBulbList;
  })}
}
