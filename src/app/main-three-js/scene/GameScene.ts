import { Injectable } from '@angular/core';
import {
    PerspectiveCamera,
    WebGLRenderer,
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Vector3,
    HemisphereLight
} from 'three';
import { GameEntity } from '../entities/GameEntity';
import { GameMap } from '../map/GameMap';
import { ResourceManager } from '../utils/ResourceManager';

@Injectable({
    providedIn: 'root'
})
export class GameScene {
    private _width: number = window.innerWidth;
    private _height: number = window.innerHeight;
    private _renderer: WebGLRenderer;
    private _camera: PerspectiveCamera;

    // threejs scene
    private _scene: Scene;

    // Game entities array
    private _gameEntities: GameEntity[] = [];

    constructor() {
        this._renderer = new WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(this._width, this._height);

        this._scene = new Scene();
        this._camera = new PerspectiveCamera(45, this._width / this._height, 0.1, 1000);
        this._camera.position.set(7, 7, 15);
        window.addEventListener('resize', this.resize, false)

        // add game map
        const gameMap = new GameMap(new Vector3(0,0,0), 15);
        this._gameEntities.push(gameMap);
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

    public load = async () => {
        // load game entities
        await ResourceManager.instance.load();
        for (let index: number = 0; index < this._gameEntities.length; index++) {
            const element = this._gameEntities[index];
            await element.load();
            this._scene.add(element.mesh);
        }

        const light = new HemisphereLight(0xffffbb, 0x080820, 1);
        this._scene.add(light);
    }

    public render = (): void => {
        requestAnimationFrame(this.render);
        this._renderer.render(this._scene, this._camera);
    }
}
