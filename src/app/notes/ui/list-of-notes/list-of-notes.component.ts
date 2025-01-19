import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../data-access/note.service';
import { Note } from '../../model/note';
import { TagComponent } from "../tags/tag.component";
import { AddNote } from '../../model/add-note';
import { NoteComponent } from '../note/note.component';
import { NoteDeleteConfirmationComponent } from "../note-delete-confirmation/note-delete-confirmation.component";

@Component({
  selector: 'app-list-of-notes',
  standalone: true,
  imports: [ReactiveFormsModule, TagComponent, NoteComponent, NoteDeleteConfirmationComponent],
  templateUrl: './list-of-notes.component.html',
  styleUrls: ['./list-of-notes.component.css'],
})
export class ListOfNotesComponent implements OnInit {
  private noteService = inject(NoteService);
  private fb = inject(FormBuilder);

  notes: Note[] = [];
  isCreateModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  noteToDeleteId: number | null = null;
  noteForm: FormGroup;
  tags: string[] = [];
  addNote: AddNote = {
    title: '',
    content: '',
    tags: []
  };

  constructor() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getAll().subscribe({
      next: (response) => {
        this.notes = response.notes;
        this.notes.forEach((note) => {
          note.createdOnUtc = new Date(note.createdOnUtc).toLocaleString('pl-PL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
        });
      },
      error: (error) => {
        console.error('Błąd: ', error);
      },
    });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
    this.noteForm.reset();
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
  }

  saveNote(): void {
    if (this.noteForm.valid) {
      this.addNote = {
        ...this.noteForm.value, // Pobierz wartości z formularza
        tags: this.tags, // Dodaj tagi
      };
  
      console.log('Saving note:', this.addNote);
  
      // Wywołanie serwisu NoteService, aby zapisać notatkę
      this.noteService.addNote(this.addNote).subscribe({
        next: (note) => {
          console.log('Note added successfully:', note);
          this.closeCreateModal(); // Zamknij modal po sukcesie
          this.getNotes();
        },
        error: (err) => {
          console.error('Error saving note:', err);
        },
      });
    } else {
      console.warn('Form is invalid.');
    }
  }

  addTagsEvent(updatedTags: string[]): void {
    this.tags = updatedTags;
  }

  editNoteHandler(id: number): void {
    console.log(`Editing note with ID: ${id}`);
    // Implement edit logic or routing to edit page
  }

  

  // Delete note
  
  deleteNoteHandler(id: number): void {
    this.isDeleteModalOpen = true;
    this.noteToDeleteId = id;
  }

  cancelDelete(): void {
    this.isDeleteModalOpen = false;
    this.noteToDeleteId = null;
  }

  confirmDelete(): void {
    if (this.noteToDeleteId !== null) {
      this.deleteNote(this.noteToDeleteId);
      this.isDeleteModalOpen = false;
      this.noteToDeleteId = null;
    }
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        console.log(`Note with ID ${id} deleted successfully`);
        this.notes = this.notes.filter((note) => note.id !== id); // Usuń notatkę z listy
      },
      error: (err) => {
        console.error('Error deleting note:', err);
      },
    });
  }

  get formControls() {
    return this.noteForm.controls;
  }
}
