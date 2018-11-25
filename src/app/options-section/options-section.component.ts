import { Component, OnInit } from '@angular/core';
import {LightSignalRService} from '../services/lightSignalR.service';

@Component({
  selector: 'app-options-section',
  templateUrl: './options-section.component.html',
  styleUrls: ['./options-section.component.css']
})
export class OptionsSectionComponent implements OnInit {

  constructor(public lightSignalRService: LightSignalRService) { 
    this.subscribeToEvents()
    this.checked=lightSignalRService.isAutomaticControlSystsemOn;
  }

  checked :boolean;
 // disabled = false;
  ngOnInit() {
  }
  
  changed(isOn: any)
  {
    console.log(isOn.checked)
    this.lightSignalRService.enableAutomaticallyLightsControlSystem(isOn.checked);
  }

  private subscribeToEvents(): void {
    this.lightSignalRService.isAutomaticLightControlSystsemOn.subscribe(()=>{
    this.checked = this.lightSignalRService.isAutomaticControlSystsemOn;
   })}
}
