import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import {LightSignalRService} from '../services/lightSignalR.service';
import {LightBulbModel} from '../models/lightBulb.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public isSideNavOpen:boolean;
  constructor(private sidenav: SidenavService,
    private lightSignalRService: LightSignalRService) {
      this.isSideNavOpen=false;
      this.lightSignalRService.StartSignalRConnection();}

  ngOnInit() {
  }
  public changeSideNavStatus(){
    this.isSideNavOpen=!this.isSideNavOpen;
    this.sidenav.toggle();
    
  }
}
