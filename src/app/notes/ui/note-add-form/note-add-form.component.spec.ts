import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteAddFormComponent } from './note-add-form.component';

describe('NoteAddFormComponent', () => {
  let component: NoteAddFormComponent;
  let fixture: ComponentFixture<NoteAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
