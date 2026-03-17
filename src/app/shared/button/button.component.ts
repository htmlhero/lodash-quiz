import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type ButtonType = 'primary' | 'secondary';
export type ButtonSize = 'medium' | 'large';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  readonly label = input.required<string>();
  readonly type = input<ButtonType>('primary');
  readonly size = input<ButtonSize>('medium');

  readonly clicked = output<void>();
}
