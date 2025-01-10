import { Component, OnInit, inject } from '@angular/core';
import { NoteService } from '../../data-access/note.service';
import { Note } from '../../model/note';
import { response } from 'express';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  noteService = inject(NoteService);
  notes: Note[] = [];
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getAll().subscribe({
      next: (response) => {
        this.notes = response.notes;
      },
      error: (error) => {
        console.error("Błąd: ", error);
        this.errorMessage = "Błąd";
      }
    })
  }
}
