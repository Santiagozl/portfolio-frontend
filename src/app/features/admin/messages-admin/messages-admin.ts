import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminApiService } from '../admin-api.service';
import { ContactMessage } from '../../../core/models';

@Component({
  selector: 'app-messages-admin',
  imports: [DatePipe],
  templateUrl: './messages-admin.html',
  styleUrl: './messages-admin.scss',
})
export class MessagesAdmin {
  private readonly adminApi = inject(AdminApiService);

  readonly messages = signal<ContactMessage[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.adminApi.getMessages().subscribe({
      next: (messages) => {
        this.messages.set(messages);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar los mensajes.');
        this.loading.set(false);
      },
    });
  }

  toggleRead(message: ContactMessage): void {
    if (!message.id) {
      return;
    }
    this.adminApi.markMessageRead(message.id, !message.read).subscribe({
      next: (updated) => {
        this.messages.update((messages) =>
          messages.map((m) => (m.id === updated.id ? updated : m))
        );
      },
      error: () => this.errorMessage.set('No se pudo actualizar el mensaje.'),
    });
  }

  remove(message: ContactMessage): void {
    if (!message.id || !confirm(`¿Eliminar el mensaje de "${message.name}"?`)) {
      return;
    }
    this.adminApi.deleteMessage(message.id).subscribe({
      next: () => this.load(),
      error: () => this.errorMessage.set('No se pudo eliminar el mensaje.'),
    });
  }
}
