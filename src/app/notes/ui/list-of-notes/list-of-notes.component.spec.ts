import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfNotesComponent } from './list-of-notes.component';

describe('ListOfNotesComponent', () => {
  let component: ListOfNotesComponent;
  let fixture: ComponentFixture<ListOfNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
