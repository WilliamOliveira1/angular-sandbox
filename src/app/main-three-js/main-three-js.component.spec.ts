import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainThreeJsComponent } from './main-three-js.component';

describe('MainThreeJsComponent', () => {
  let component: MainThreeJsComponent;
  let fixture: ComponentFixture<MainThreeJsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainThreeJsComponent]
    });
    fixture = TestBed.createComponent(MainThreeJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
