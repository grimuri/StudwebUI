import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDeleteConfirmationComponent } from './note-delete-confirmation.component';

describe('NoteDeleteConfirmationComponent', () => {
  let component: NoteDeleteConfirmationComponent;
  let fixture: ComponentFixture<NoteDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteDeleteConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
