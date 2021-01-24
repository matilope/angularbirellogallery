import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingUpdateComponent } from './painting-update.component';

describe('PaintingUpdateComponent', () => {
  let component: PaintingUpdateComponent;
  let fixture: ComponentFixture<PaintingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
