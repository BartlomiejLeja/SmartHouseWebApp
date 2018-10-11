import { Component, OnInit,OnDestroy, ChangeDetectorRef ,ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { SidenavService } from '../services/sidenav.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit , OnDestroy{
  @ViewChild('sidenav') public sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  constructor(private sidenavService: SidenavService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
