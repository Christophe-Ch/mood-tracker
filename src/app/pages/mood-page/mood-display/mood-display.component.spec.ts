import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodDisplayComponent } from './mood-display.component';

describe('MoodDisplayComponent', () => {
  let component: MoodDisplayComponent;
  let fixture: ComponentFixture<MoodDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoodDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
