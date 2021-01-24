import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingNewComponent } from './painting-new.component';

describe('PaintingNewComponent', () => {
  let component: PaintingNewComponent;
  let fixture: ComponentFixture<PaintingNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
