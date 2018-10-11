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
    this.graf(element.Name,element.BulbOffTimeInMinutesPerDay,element.BulbOnTimeInMinutesPerDay,element.Name)
    this.chartTabel.push(this.PieChart);
   }); 
   
  }
   
  graf(name : string,bulbOnTimeInMinutesPerDay:
     number, bulbOffTimeInMinutesPerDay: number, title: string):any{
    this.PieChart = new Chart(name,{
      type:'pie',
      data:{
        labels:["On","Off"],
        datasets:[{
          label:'# of Votes',
          data:[bulbOnTimeInMinutesPerDay,bulbOffTimeInMinutesPerDay],
          backgroundColor:[
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
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
  }

  constructor(public lightSignalRService: LightSignalRService) { 
}

  numbers = timer(30000,30000);
  
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
    element.data.datasets[0].data[1] =--this.lightSignalRService.lightBulbList[index].BulbOffTimeInMinutesPerDay;
    element.data.datasets[0].data[0]= ++this.lightSignalRService.lightBulbList[index].BulbOnTimeInMinutesPerDay;
    element.update();
  }
  });
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
