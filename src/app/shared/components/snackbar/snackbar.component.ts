import { Component, input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  standalone: true,
})
export class SnackbarComponent {
  snackBarStatus = input('');
  message = input('');
}
