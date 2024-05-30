import { Injectable } from '@angular/core';
import { PerspectiveCamera, WebGLRenderer, Scene, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

@Injectable({
  providedIn: 'root'
})
export class GameScene {
  private _width: number = window.innerWidth;
  private _height: number = window.innerHeight;
  private _renderer: WebGLRenderer;
  private _camera: PerspectiveCamera;
  private _scene: Scene;

  constructor() {
    this._renderer = new WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(this._width, this._height);

    this._scene = new Scene();
    this._camera = new PerspectiveCamera(45, this._width / this._height, 0.1, 1000);
    this._camera.position.set(0, 0, 3);
    window.addEventListener('resize', this.resize, false)
  }

  private resize = () => {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._renderer.setSize(this._width, this._height);
    this._camera.aspect = this._width / this._height;
    this._camera.updateProjectionMatrix();
  };

  public initialize(targetElement: HTMLDivElement): void {
    if (!targetElement) {
      throw new Error("Unable to find target element");
    }

    targetElement.appendChild(this._renderer.domElement);
  }

  public loadCube(): void {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    this._scene.add(cube);
  }

  public render = (): void => {
    requestAnimationFrame(this.render);
    this._renderer.render(this._scene, this._camera);
  }
}
