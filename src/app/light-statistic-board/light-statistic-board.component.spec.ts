import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightStatisticBoardComponent } from './light-statistic-board.component';

describe('LightStatisticBoardComponent', () => {
  let component: LightStatisticBoardComponent;
  let fixture: ComponentFixture<LightStatisticBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightStatisticBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightStatisticBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
