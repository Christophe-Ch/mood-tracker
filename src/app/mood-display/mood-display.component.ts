import {
  AfterContentInit,
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  runInInjectionContext,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

const MAX_SMILE_HEIGHT = 6;
const MIN_SMILE_WIDTH = 20;
const MAX_SMILE_WIDTH = 35;
const MIN_EYE_SIZE = 2;
const MAX_EYE_SIZE = 15;

@Component({
  selector: 'app-mood-display',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mood-display.component.html',
  styleUrl: './mood-display.component.scss',
})
export class MoodDisplayComponent implements AfterContentInit {
  private _injector = inject(Injector);

  mouth = viewChild<ElementRef>('mouth');
  face = viewChild<ElementRef>('face');
  faceOverlay = viewChild<ElementRef>('faceOverlay');
  eyes = viewChildren<ElementRef>('eye');
  moodInput = signal(50);

  ngAfterContentInit(): void {
    runInInjectionContext(this._injector, () => {
      effect(() => {
        const mouth = this.mouth()!.nativeElement;

        const absValue = Math.abs(this.moodInput()) * 2;
        const smileHeight = (MAX_SMILE_HEIGHT * absValue) / 100;
        const smileWidth =
          MIN_SMILE_WIDTH +
          ((MAX_SMILE_WIDTH - MIN_SMILE_WIDTH) * absValue) / 100;
        mouth.style.height = `${smileHeight}rem`;
        mouth.style.width = `${smileWidth}%`;
        this.faceOverlay()!.nativeElement.style.opacity = `${100 - absValue}%`;

        for (const eye of this.eyes()) {
          const calculated = `${
            MIN_EYE_SIZE + ((MAX_EYE_SIZE - MIN_EYE_SIZE) * absValue) / 100
          }px`;
          const other = `${MIN_EYE_SIZE}px`;
          if (this.moodInput() < 0) {
            eye.nativeElement.style.width = calculated;
            eye.nativeElement.style.height = other;
          } else {
            eye.nativeElement.style.height = calculated;
            eye.nativeElement.style.width = other;
          }
        }

        if (this.moodInput() < 0) {
          mouth.style.borderColor = 'black transparent transparent transparent';
          mouth.style.bottom = 'auto';
          mouth.style.top = '70%';
          this.face()!.nativeElement.style.background = '#AEE5D8';
        } else {
          mouth.style.borderColor = 'transparent transparent black transparent';
          mouth.style.bottom = '30%';
          mouth.style.top = 'auto';
          this.face()!.nativeElement.style.background = '#F8E16C';
        }
      });
    });
  }
}
