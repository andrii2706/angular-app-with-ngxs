import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class SnackbarComponent {
  snackBarStatus = input('');
  message = input('');
}
