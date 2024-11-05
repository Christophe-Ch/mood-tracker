import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowCalendarComponent } from './row-calendar.component';

describe('RowCalendarComponent', () => {
  let component: RowCalendarComponent;
  let fixture: ComponentFixture<RowCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
