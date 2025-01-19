import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../model/note';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() note!: Note; // Przyjmuje obiekt notatki
  @Output() deleteNote = new EventEmitter<number>(); // Emituje identyfikator notatki do usunięcia
  @Output() editNote = new EventEmitter<number>(); // Emituje identyfikator notatki do edycji

  contentLines: string[] = []; // Zmienna lokalna na linie treści

  ngOnInit(): void {
    this.contentLines = this.getContentLines(this.note.content); // Przypisz linie treści
  }

  getContentLines(content: string): string[] {
    // Rozdziel treść na maksymalnie 3 linie
    return content.split('.').filter((line) => line.trim() !== '').slice(0, 3);
  }

  onDelete(): void {
    this.deleteNote.emit(this.note.id); // Emitowanie zdarzenia usunięcia notatki
  }

  onEdit(): void {
    this.editNote.emit(this.note.id); // Emitowanie zdarzenia edycji notatki
  }
}

