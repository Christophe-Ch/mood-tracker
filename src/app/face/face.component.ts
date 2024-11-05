import {
  Component,
  effect,
  ElementRef,
  input,
  viewChild,
  viewChildren,
} from '@angular/core';
import MoodRecord from '../mood/models/mood-record.model';
import { Mood } from '../mood/models/mood.enum';

const MAX_SMILE_HEIGHT = 6;
const MIN_SMILE_WIDTH = 20;
const MAX_SMILE_WIDTH = 35;
const MIN_EYE_SIZE = 2;
const MAX_EYE_SIZE = 15;

@Component({
  selector: 'app-face',
  standalone: true,
  imports: [],
  templateUrl: './face.component.html',
  styleUrl: './face.component.scss',
})
export class FaceComponent {
  value = input<number>(0);

  mouth = viewChild<ElementRef>('mouth');
  face = viewChild<ElementRef>('face');
  faceOverlay = viewChild<ElementRef>('faceOverlay');
  eyes = viewChildren<ElementRef>('eye');

  constructor() {
    effect(() => {
      this._updateFace();
    });
  }

  private _updateFace(): void {
    const value = this.value();

    const mouth = this.mouth()!.nativeElement;

    const absValue = Math.abs(value) * 2;
    const smileHeight = (MAX_SMILE_HEIGHT * absValue) / 100;
    const smileWidth =
      MIN_SMILE_WIDTH + ((MAX_SMILE_WIDTH - MIN_SMILE_WIDTH) * absValue) / 100;
    mouth.style.height = `${smileHeight}rem`;
    mouth.style.width = `${smileWidth}%`;
    this.faceOverlay()!.nativeElement.style.opacity = `${100 - absValue}%`;

    for (const eye of this.eyes()) {
      const calculated = `${
        MIN_EYE_SIZE + ((MAX_EYE_SIZE - MIN_EYE_SIZE) * absValue) / 100
      }px`;
      const other = `${MIN_EYE_SIZE}px`;
      if (value < 0) {
        eye.nativeElement.style.width = calculated;
        eye.nativeElement.style.height = other;
      } else {
        eye.nativeElement.style.height = calculated;
        eye.nativeElement.style.width = other;
      }
    }

    if (value < 0) {
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
  }
}
