import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLoungeComponent } from './game-lounge.component';

describe('GameLoungeComponent', () => {
  let component: GameLoungeComponent;
  let fixture: ComponentFixture<GameLoungeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameLoungeComponent]
    });
    fixture = TestBed.createComponent(GameLoungeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
