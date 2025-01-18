import { Component, inject, input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent {
  @Output() tagsChanged = new EventEmitter<string[]>();
  fb = inject(FormBuilder);
  tagForm: FormGroup;
  tags: string[] = [];

  constructor() {
    this.tagForm = this.fb.group({
      tag: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(20), // Ograniczenie długości tagu do 20 znaków
        ],
      ],
    });
  }

  addTag(): void {
    const tagName = this.tagForm.get('tag')?.value?.trim(); // Pobierz wartość z formularza
    if (tagName) {
      if (!this.tags.includes(tagName)) {
        // Sprawdź, czy tag nie istnieje na liście
        this.tags.push(tagName); // Dodaj nowy tag do listy
        this.emitTags(); // Emituj zaktualizowaną listę tagów
      }
      this.tagForm.patchValue({ tag: '' }); // Wyczyść pole formularza
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag); // Usuń tag z listy `tags`
    this.emitTags(); // Emituj zaktualizowaną listę tagów
  }

  emitTags(): void {
    this.tagsChanged.emit(this.tags); // Emituj zaktualizowaną listę tagów
  }

  get formControls() {
    return this.tagForm.controls;
  }
}
