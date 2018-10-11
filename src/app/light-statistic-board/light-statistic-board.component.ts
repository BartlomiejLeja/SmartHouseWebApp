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
   minutsOn:number =this.lightSignalRService.lightBulbList[0].BulbOffTimeInMinutesPerDay;
   minutsOff:number =this.lightSignalRService.lightBulbList[0].BulbOnTimeInMinutesPerDay;

  ngAfterViewInit(): void {
  this.graf()
  }
   
  graf():void{
    this.PieChart = new Chart('pieChart',{
      type:'pie',
      data:{
        labels:["On","Off"],
        datasets:[{
          label:'# of Votes',
          data:[this.lightSignalRService.lightBulbList[0].BulbOnTimeInMinutesPerDay,this.lightSignalRService.lightBulbList[0].BulbOffTimeInMinutesPerDay],
          backgroundColor:[
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
            'rgba(255,206,86,1)',
            'rgba(255,175,96,1)',
            'rgba(255,145,186,1)',
          ],
          borderWidth:1
        }]
      },
      options:{
        title:{
          text:"Pie Chart",
          display: true
        },
        responsive: false,
      //  display:true,
      }
    });
  }
   $counter: Observable<any>;
  

  constructor(private lightSignalRService: LightSignalRService) {
    
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
  if(this.lightSignalRService.lightBulbList[0].LightStatus)
  {
    this.PieChart.data.datasets[0].data[1] =--this.lightSignalRService.lightBulbList[0].BulbOffTimeInMinutesPerDay;
    this.PieChart.data.datasets[0].data[0]= ++this.lightSignalRService.lightBulbList[0].BulbOnTimeInMinutesPerDay;
    this.PieChart.update();
  }

}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
