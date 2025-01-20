import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-note-delete-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './note-delete-confirmation.component.html',
  styleUrl: './note-delete-confirmation.component.css'
})
export class NoteDeleteConfirmationComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
