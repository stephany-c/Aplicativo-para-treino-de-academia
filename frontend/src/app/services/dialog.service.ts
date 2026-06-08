import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface DialogConfig {
  type: 'confirm' | 'alert' | 'success';
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: 'warning' | 'success' | 'info' | 'danger';
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private responseSubject = new Subject<boolean>();

  config = signal<DialogConfig | null>(null);
  isOpen = signal(false);

  open(cfg: DialogConfig): Promise<boolean> {
    this.config.set(cfg);
    this.isOpen.set(true);
    return new Promise(resolve => {
      this.responseSubject.asObservable().subscribe(result => resolve(result));
    });
  }

  confirm(title: string, message: string): Promise<boolean> {
    return this.open({
      type: 'confirm',
      title,
      message,
      icon: 'warning',
      confirmLabel: 'Confirmar',
      cancelLabel: 'Cancelar',
    });
  }

  danger(title: string, message: string, confirmLabel = 'Excluir'): Promise<boolean> {
    return this.open({
      type: 'confirm',
      title,
      message,
      icon: 'danger',
      confirmLabel,
      cancelLabel: 'Cancelar',
    });
  }

  success(title: string, message: string): Promise<boolean> {
    return this.open({
      type: 'alert',
      title,
      message,
      icon: 'success',
      confirmLabel: 'Fechar',
    });
  }

  respond(result: boolean) {
    this.isOpen.set(false);
    this.responseSubject.next(result);
    setTimeout(() => this.config.set(null), 300);
  }
}
