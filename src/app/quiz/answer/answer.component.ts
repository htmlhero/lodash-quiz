import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerComponent {
  readonly correct = input.required<boolean>();
  readonly disabled = input.required<boolean>();

  readonly clicked = output<void>();

  protected readonly selected = signal<boolean>(false);

  protected onClick(): void {
    this.selected.set(true);
    this.clicked.emit();
  }
}
