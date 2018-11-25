import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsSectionComponent } from './options-section.component';

describe('OptionsSectionComponent', () => {
  let component: OptionsSectionComponent;
  let fixture: ComponentFixture<OptionsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
