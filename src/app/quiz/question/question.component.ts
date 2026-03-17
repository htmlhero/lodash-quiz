import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { marked } from 'marked';

import { CardComponent } from 'app/shared/card/card.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
  readonly markdown = input.required<string | null>();

  protected readonly html = computed(() => {
    const markdown = this.markdown();

    return markdown ? marked.parse(markdown, { async: false }) : '';
  });
}
