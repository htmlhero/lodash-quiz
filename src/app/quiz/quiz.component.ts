import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';
import { difference, sampleSize, shuffle } from 'lodash-es';

import { HeaderComponent } from 'app/shared/header/header.component';
import { lodash } from 'generated/lodash';

import { AnswerComponent } from './answer/answer.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnswerComponent, HeaderComponent, ProgressBarComponent, QuestionComponent]
})
export class QuizComponent implements OnInit {
  readonly duration = input.required<number>();

  readonly finished = output<number>();

  protected readonly progress = signal<number>(0);
  protected readonly score = signal<number>(0);

  protected readonly question = signal<string | null>(null);
  protected readonly answerList = signal<string[]>([]);
  protected readonly correctAnswer = signal<string | null>(null);
  protected readonly disabled = signal<boolean>(false);

  private readonly methodList: string[] = Object.keys(lodash);
  private readonly usedMethodList: string[] = [];

  private getUnusedRandomMethodList(size: number = 1): string[] {
    const unusedMethodList = difference(this.methodList, this.usedMethodList);

    return sampleSize(unusedMethodList, size);
  }

  private getUnusedRandomMethod(): string {
    return this.getUnusedRandomMethodList()[0];
  }

  ngOnInit(): void {
    this.showMethod(this.getUnusedRandomMethod());
  }

  private showMethod(method: string): void {
    this.usedMethodList.push(method);

    const description = lodash[method];
    this.question.set(description);

    const wrongAnswerList = this.getUnusedRandomMethodList(3);
    const answerList = shuffle([...wrongAnswerList, method]);
    this.answerList.set(answerList);

    this.correctAnswer.set(method);
  }

  protected onAnswerClicked(correct: boolean): void {
    if (this.disabled()) {
      return;
    }

    this.disabled.set(true);
    this.progress.set(this.usedMethodList.length);

    setTimeout(() => {
      if (correct) {
        this.score.update((score) => score + 1);
      }

      if (this.progress() < this.duration()) {
        this.showMethod(this.getUnusedRandomMethod());
        this.disabled.set(false);
      } else {
        this.finished.emit(this.score());
      }
    }, 1000);
  }
}
