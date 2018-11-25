import { Component, OnInit ,AfterViewInit} from '@angular/core';
import * as Chart from 'chart.js';
import {Observable, interval,Subscription, timer} from 'rxjs';
import { map } from 'rxjs/operators'
import { HubConnection, IHubConnectionOptions } from '@aspnet/signalr';
import {LightSignalRService} from '../services/lightSignalR.service';
import {LightBulbModel} from '../models/lightBulb.model';

@Component({
  selector: 'app-light-statistic-board',
  templateUrl: './light-statistic-board.component.html',
  styleUrls: ['./light-statistic-board.component.css']
})
export class LightStatisticBoardComponent  implements AfterViewInit {
  private subscription: Subscription;
  PieChart:any;
  chartTabel: Array<any>;
   minutsOn:number =this.lightSignalRService.lightBulbList[0].BulbOffTimeInMinutesPerDay;
   minutsOff:number =this.lightSignalRService.lightBulbList[0].BulbOnTimeInMinutesPerDay;

  ngAfterViewInit(): void {
    this.chartTabel = new Array();
    this.lightSignalRService.lightBulbList.forEach(element => {
      
      //TODO here we should assine to OnTime dataOn
      if(element.LightStatus==true){
       var dateOn = Date.parse(element.TimeOn.toString());
       element.BulbOnTimeInMinutesPerDay  += (new Date().getTime() -  dateOn)/60000;
       element.BulbOffTimeInMinutesPerDay -=(new Date().getTime() -  dateOn)/60000;
       //TODO here we should assine to OnTime dataOn Check if works
       element.TimeOn =new Date();
      } 

    this.PieChartsSeter(element.Name,element.BulbOnTimeInMinutesPerDay,element.BulbOffTimeInMinutesPerDay,element.Name)
   }); 
  }
   
  PieChartsSeter(name : string,bulbOnTimeInMinutesPerDay:
    number, bulbOffTimeInMinutesPerDay: number, title: string):any{
    this.PieChart = new Chart(name,{
      type:'pie',
      data:{
        labels:["On","Off"],
        datasets:[{
          label:'# of Votes',
          data:[bulbOnTimeInMinutesPerDay,bulbOffTimeInMinutesPerDay],
          backgroundColor:[
            'rgba(54,162,235,1)',
            'rgba(255,99,132,1)',
          ],
          borderWidth:1
        }]
      },
      options:{
        title:{
          text: title,
          display: true
        },
        responsive: false,
      //  display:true,
      }
    });
    this.chartTabel.push(this.PieChart);
  }

  constructor(public lightSignalRService: LightSignalRService) { 
}

  numbers = timer(60000,60000);
  
  ngOnInit() {
   this.subscription= this.numbers.subscribe(
     x => { console.log(x);
       this.counter();
      });
  }

counter():void
{
  this.chartTabel.forEach((element,index) => {
    if(this.lightSignalRService.lightBulbList[index].LightStatus)
  {
    element.data.datasets[0].data[0] =  ++ this.lightSignalRService.lightBulbList[index].BulbOnTimeInMinutesPerDay ;
    element.data.datasets[0].data[1] =  -- this.lightSignalRService.lightBulbList[index].BulbOffTimeInMinutesPerDay;
    element.update();
  }
  });
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
