import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../model/note';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() note!: Note;
  @Output() deleteNote = new EventEmitter<number>();
  @Output() editNote = new EventEmitter<number>();

  onDelete(): void {
    this.deleteNote.emit(this.note.id);
  }

  onEdit(): void {
    this.editNote.emit(this.note.id);
  }
}

