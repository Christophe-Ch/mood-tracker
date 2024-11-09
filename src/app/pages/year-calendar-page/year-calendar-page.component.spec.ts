import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearCalendarPageComponent } from './year-calendar-page.component';

describe('YearCalendarPageComponent', () => {
  let component: YearCalendarPageComponent;
  let fixture: ComponentFixture<YearCalendarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearCalendarPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearCalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
