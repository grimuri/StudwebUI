import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../data-access/note.service';
import { Note } from '../../model/note';
import { TagComponent } from "../tags/tag.component";
import { AddNote } from '../../model/add-note';
import { NoteComponent } from '../note/note.component';
import { NoteDeleteConfirmationComponent } from "../note-delete-confirmation/note-delete-confirmation.component";
import { NoteAddFormComponent } from "../note-add-form/note-add-form.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-of-notes',
  standalone: true,
  imports: [ReactiveFormsModule, TagComponent, NoteComponent, NoteDeleteConfirmationComponent, NoteAddFormComponent],
  templateUrl: './list-of-notes.component.html',
  styleUrls: ['./list-of-notes.component.css'],
})
export class ListOfNotesComponent implements OnInit {
  private toastr = inject(ToastrService);
  private noteService = inject(NoteService);

  notes: Note[] = [];
  isCreateModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  noteToDeleteId: number | null = null;

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

  editNoteHandler(id: number): void {
    console.log(`Editing note with ID: ${id}`);
    // Implement edit logic or routing to edit page
  }

  // Add note
  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  cancelModalHandler(): void {
    this.isCreateModalOpen = false;
  }

  noteAddedHandler(): void {
    this.getNotes();
    this.isCreateModalOpen = false;    
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
        this.notes = this.notes.filter((note) => note.id !== id);
        this.toastr.success('Note deleted successfully', 'Success')
      },
      error: (err) => {
        console.error('Error deleting note:', err);
      },
    });
  }
}
