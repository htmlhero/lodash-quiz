import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { ButtonComponent } from 'app/shared/button/button.component';
import { CardComponent } from 'app/shared/card/card.component';
import { HeaderComponent } from 'app/shared/header/header.component';

@Component({
  selector: 'app-outro',
  templateUrl: './outro.component.html',
  styleUrl: './outro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, CardComponent, HeaderComponent]
})
export class OutroComponent {
  readonly duration = input.required<number>();
  readonly score = input.required<number>();

  readonly started = output<void>();
}
