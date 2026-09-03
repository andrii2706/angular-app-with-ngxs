import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SnackbarComponent {
  snackbar = inject(SnackbarService);
}
