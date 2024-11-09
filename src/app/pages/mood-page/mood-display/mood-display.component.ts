import {
  Component,
  inject,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import MoodRecord from '../../../mood/models/mood-record.model';
import { Mood } from '../../../mood/models/mood.enum';
import { MoodService } from '../../../mood/services/mood.service';
import { FaceComponent } from '../face/face.component';

@Component({
  selector: 'app-mood-display',
  standalone: true,
  imports: [FormsModule, FaceComponent],
  templateUrl: './mood-display.component.html',
  styleUrl: './mood-display.component.scss',
})
export class MoodDisplayComponent implements OnChanges {
  private _moodService = inject(MoodService);

  mood = input<MoodRecord | null>();
  moodInput = signal(50);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mood'] && this.mood()) {
      this.moodInput.set(this._getValueFromMood());
    }
  }

  updateMood(): void {
    const record = this.mood();

    if (record) {
      record.mood = this._getMoodFromInput();
      this._moodService.update(record);
    }
  }

  private _getMoodFromInput(): Mood {
    if (this.moodInput() === -50) {
      return Mood.Sad;
    } else if (this.moodInput() === 50) {
      return Mood.Happy;
    }

    return Mood.Unset;
  }

  private _getValueFromMood(): number {
    switch (this.mood()?.mood) {
      case Mood.Happy:
        return 50;
      case Mood.Sad:
        return -50;
      default:
        return 0;
    }
  }
}
