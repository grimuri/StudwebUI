import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoteFormComponent } from './edit-note-form.component';

describe('EditNoteFormComponent', () => {
  let component: EditNoteFormComponent;
  let fixture: ComponentFixture<EditNoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNoteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
