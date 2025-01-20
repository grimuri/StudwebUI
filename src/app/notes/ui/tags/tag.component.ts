import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() tags: string[] = [];

  fb = inject(FormBuilder);
  tagForm: FormGroup;
  

  constructor() {
    this.tagForm = this.fb.group({
      tag: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  addTag(): void {
    const tagName = this.tagForm.get('tag')?.value?.trim();
    if (tagName) {
      if (!this.tags.includes(tagName)) {
        this.tags.push(tagName);
        this.emitTags();
      }
      this.tagForm.patchValue({ tag: '' });
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag);
    this.emitTags();
  }

  emitTags(): void {
    this.tagsChanged.emit(this.tags);
  }

  get formControls() {
    return this.tagForm.controls;
  }
}
