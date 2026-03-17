import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { IntroComponent } from './intro/intro.component';
import { OutroComponent } from './outro/outro.component';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IntroComponent, OutroComponent, QuizComponent]
})
export class AppComponent {
  protected readonly state = signal<'intro' | 'quiz' | 'outro'>('intro');
  protected readonly duration = signal<number>(20);
  protected readonly score = signal<number>(0);

  protected onStart(): void {
    this.state.set('quiz');
  }

  protected onFinish(score: number): void {
    this.score.set(score);
    this.state.set('outro');
  }
}
