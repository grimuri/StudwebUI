import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from '../../data-access/note.service';
import { DetailsOfNote } from '../../model/details-of-note';
import { NoteDeleteConfirmationComponent } from '../note-delete-confirmation/note-delete-confirmation.component';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [NoteDeleteConfirmationComponent],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css',
})
export class NoteDetailsComponent {
  private noteService = inject(NoteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  isDeleteModalOpen: boolean = false;
  note: DetailsOfNote = {
    id: 0,
    title: '',
    content: '',
    createdOnUtc: '',
    lastModifiedOnUtc: '',
    tags: [],
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.toastr.error('Invalid note ID', 'Error');
      this.goBack();
      return;
    }

    this.noteService.getNoteById(id).subscribe({
      next: (data) => {
        this.note = data;
        this.note.createdOnUtc = new Date(this.note.createdOnUtc).toLocaleString('pl-PL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
          this.note.lastModifiedOnUtc = new Date(this.note.lastModifiedOnUtc).toLocaleString('pl-PL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
      },
      error: () => {
        this.toastr.error('Could not fetch the note details', 'Error');
        this.goBack();
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/note']);
  }

  onEdit(): void {
    if (this.note) {
      this.router.navigate(['/note', this.note.id, 'edit']);
    }
  }

  onDelete(): void {
    this.isDeleteModalOpen = true;
  }

  confirmDelete(): void {
    this.isDeleteModalOpen = true;
    this.deleteNote(this.note.id);

  }

  cancelDelete(): void {
    this.isDeleteModalOpen = false;
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.toastr.success('Note deleted successfully', 'Success');
        this.goBack();
      },
      error: () => {
        this.toastr.error('Error deleting note', 'Error');
      },
    });
  }
}
