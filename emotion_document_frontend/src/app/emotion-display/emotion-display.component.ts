import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emotion-display',
  templateUrl: './emotion-display.component.html',
  styleUrls: ['./emotion-display.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EmotionDisplayComponent {
  @Input() emotions: { emotion: string, score: number }[] = [];
}
