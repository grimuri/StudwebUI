import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoteService } from '../../data-access/note.service';
import { AddNote } from '../../model/add-note';
import { TagComponent } from '../tags/tag.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-add-form',
  standalone: true,
  imports: [TagComponent, ReactiveFormsModule],
  templateUrl: './note-add-form.component.html',
  styleUrl: './note-add-form.component.css',
})
export class NoteAddFormComponent {
  private noteService = inject(NoteService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  @Output() cancelModal = new EventEmitter();
  @Output() noteAdded = new EventEmitter();

  noteForm: FormGroup;
  tags: string[] = [];
  addNote: AddNote = {
    title: '',
    content: '',
    tags: [],
  };

  constructor() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  addTagsEvent(updatedTags: string[]): void {
    this.tags = updatedTags;
  }

  saveNote(): void {
    if (this.noteForm.valid) {
      this.addNote = {
        ...this.noteForm.value,
        tags: this.tags,
      };
      
      this.noteService.addNote(this.addNote).subscribe({
        next: (note) => {
          this.noteAdded.emit(note);
          this.noteForm.reset();
          this.tags = [];
          this.toastr.success('Note added successfully', 'Success');
        },
        error: () => {
          this.toastr.error('An error occurred while adding the note', 'Error');
        },
      });
    } else {
      this.toastr.warning('Please fill out the form correctly', 'Invalid Form');
    }
  }

  onCancel(): void {
    this.cancelModal.emit();
  }

  get formControls() {
    return this.noteForm.controls;
  }
}
