// snackbar.service.ts
import { Service, signal } from '@angular/core';
import { SnackbarStatus } from '../../models/snackbar.interfaces';

@Service()
export class SnackbarService {
  message = signal('');
  snackBarStatus = signal<SnackbarStatus>('info');
  visible = signal(false);

  private timeoutId?: ReturnType<typeof setTimeout>;

  show(message: string, status: SnackbarStatus = 'info', duration = 3000) {
    this.message.set(message);
    this.snackBarStatus.set(status);
    this.visible.set(true);

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.visible.set(false), duration);
  }
}
