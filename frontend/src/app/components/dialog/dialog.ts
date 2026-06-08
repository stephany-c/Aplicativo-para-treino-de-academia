import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.html',
})
export class DialogComponent {
  dialog = inject(DialogService);

  onBackdropClick(event: MouseEvent) {
    // Fechar apenas em modais do tipo 'alert', não em confirms
    if (this.dialog.config()?.type === 'alert') {
      this.dialog.respond(false);
    }
  }
}
