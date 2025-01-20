import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../data-access/note.service';
import { ToastrService } from 'ngx-toastr';
import { DetailsOfNote } from '../../model/details-of-note';
import { TagComponent } from '../tags/tag.component';
import { EditNote } from '../../model/edit-note';

@Component({
  selector: 'app-edit-note-form',
  standalone: true,
  imports: [ReactiveFormsModule, TagComponent],
  templateUrl: './edit-note-form.component.html',
  styleUrl: './edit-note-form.component.css'
})
export class EditNoteFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private noteService = inject(NoteService);
  private toastr = inject(ToastrService);

  noteForm!: FormGroup;
  noteId!: number;
  tags: string[] = [];

  ngOnInit(): void {
    this.initializeForm();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.toastr.error('Invalid note ID', 'Error');
      this.router.navigate(['/notes']);
      return;
    }

    this.noteId = id;
    this.loadNoteDetails(id);
  }

  initializeForm(): void {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  loadNoteDetails(id: number): void {
    this.noteService.getNoteById(id).subscribe({
      next: (note: DetailsOfNote) => {
        this.noteForm.patchValue({
          title: note.title,
          content: note.content,
        });
        this.tags = note.tags;
      },
      error: () => {
        this.toastr.error('Failed to load note details', 'Error');
        this.router.navigate(['/note']);
      },
    });
  }

  saveNote(): void {
    if (this.noteForm.valid) {
      const updatedNote: EditNote = {
        title: this.noteForm.value.title,
        content: this.noteForm.value.content,
        tags: this.tags,
      };

      this.noteService.updateNote(this.noteId, updatedNote).subscribe({
        next: () => {
          this.toastr.success('Note updated successfully', 'Success');
          this.router.navigate([`/note/${this.noteId}`]);
        },
        error: () => {
          this.toastr.error('Failed to update the note', 'Error');
        },
      });
    } else {
      this.toastr.warning('Please fill out the form correctly', 'Invalid Form');
    }
  }

  onCancel(): void {
    this.router.navigate(['/note']);
  }

  addTagsEvent(updatedTags: string[]): void {
    this.tags = updatedTags;
  }
}
