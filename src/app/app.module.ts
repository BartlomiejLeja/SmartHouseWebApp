import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from '@angular/http';
import { RouterModule } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatDialogModule} from '@angular/material/';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SidenavService } from './services/sidenav.service';
import { LightService} from './services/light.service';
import{LightSignalRService} from './services/lightSignalR.service'
import { AppComponent } from './app.component';
import { LightControlComponent } from './light-control/light-control.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LightStatisticBoardComponent } from './light-statistic-board/light-statistic-board.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LightControlComponent,
    SidenavComponent,
    ToolbarComponent,
    LightStatisticBoardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'lightcontrol', pathMatch: 'full' },
      { path: 'lightcontrol', component: LightControlComponent },
      { path: 'lightStatisticBoard', component: LightStatisticBoardComponent },
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SidenavService,LightSignalRService, LightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
