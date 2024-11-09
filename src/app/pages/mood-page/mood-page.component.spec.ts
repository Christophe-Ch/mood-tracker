import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodPageComponent } from './mood-page.component';

describe('MoodPageComponent', () => {
  let component: MoodPageComponent;
  let fixture: ComponentFixture<MoodPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
