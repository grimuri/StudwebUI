import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-note-delete-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './note-delete-confirmation.component.html',
  styleUrl: './note-delete-confirmation.component.css'
})
export class NoteDeleteConfirmationComponent {
  @Output() confirm = new EventEmitter<void>(); // Emituje zdarzenie potwierdzenia
  @Output() cancel = new EventEmitter<void>(); // Emituje zdarzenie anulowania

  onConfirm(): void {
    this.confirm.emit(); // Emituje zdarzenie potwierdzenia
  }

  onCancel(): void {
    this.cancel.emit(); // Emituje zdarzenie anulowania
  }
}
