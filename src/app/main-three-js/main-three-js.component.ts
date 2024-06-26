import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GameScene } from '../Services/ThreeJs/scene/GameScene';

@Component({
  selector: 'app-main-three-js',
  templateUrl: './main-three-js.component.html',
  styleUrls: ['./main-three-js.component.css']
})
export class MainThreeJsComponent implements AfterViewInit {
  // set the rendererContainer in the html element as -> <div #rendererContainer></div>
  @ViewChild('rendererContainer', { static: true }) rendererContainer?: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit(): void {
    this.initScene();
  }

  /**
   * init the threeJs scene
   */
  public async initScene(): Promise<void> {
    if (this.rendererContainer) {
      GameScene.instance.initialize(this.rendererContainer.nativeElement);
      await GameScene.instance.load();
      GameScene.instance.render();
    } else {
      console.error("Renderer container is not available");
    }
  }
}
