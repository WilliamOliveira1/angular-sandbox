import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GameScene } from './scene/GameScene';

@Component({
  selector: 'app-main-three-js',
  templateUrl: './main-three-js.component.html',
  styleUrls: ['./main-three-js.component.css']
})
export class MainThreeJsComponent implements AfterViewInit {
  // set the rendererContainer in the html element as -> <div #rendererContainer></div>
  @ViewChild('rendererContainer', { static: true }) rendererContainer?: ElementRef<HTMLDivElement>;

  constructor(private gameScene: GameScene) {}

  ngAfterViewInit(): void {
    this.initScene();
  }

  /**
   * init the threeJs scene
   */
  public initScene(): void {
    if (this.rendererContainer) {
      this.gameScene.initialize(this.rendererContainer.nativeElement);
      this.gameScene.loadCube();
      this.gameScene.render();
    } else {
      console.error("Renderer container is not available");
    }
  }
}
