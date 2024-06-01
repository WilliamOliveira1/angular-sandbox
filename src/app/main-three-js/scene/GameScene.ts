import { Injectable } from '@angular/core';
import {
    PerspectiveCamera,
    WebGLRenderer,
    Scene,
    Vector3,
    HemisphereLight,
    Clock
} from 'three';
import { GameEntity } from '../entities/GameEntity';
import { GameMap } from '../map/GameMap';
import { ResourceManager } from '../utils/ResourceManager';
import { PlayerTank } from '../entities/PlayerTank';

@Injectable({
    providedIn: 'root'
})
export class GameScene {
    private static _instance = new GameScene();
    public static get instance() {
        return this._instance;
    }
    private _width: number = window.innerWidth;
    private _height: number = window.innerHeight;
    private _renderer: WebGLRenderer;
    private _camera: PerspectiveCamera;
    private _mapSize: number = 60; 

    // threejs scene
    private _scene: Scene;

    // Game entities array
    private _gameEntities: GameEntity[] = [];

    private _clock: Clock = new Clock();

    constructor() {
        this._renderer = new WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(this._width*0.95, this._height*0.95);
        
        this._scene = new Scene();
        this._camera = new PerspectiveCamera(45, this._width / this._height, 0.1, 1000);
        this._camera.position.set(7, 7, 15);
        window.addEventListener('resize', this.resize, false)

        // add game map
        const gameMap = new GameMap(new Vector3(0,0,0), this._mapSize);
        this._gameEntities.push(gameMap);

        // add the player tank
        const playerTank = new PlayerTank(new Vector3(7,7,0));
        this._gameEntities.push(playerTank);
    }

    private resize = () => {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._renderer.setSize(this._width*0.95, this._height*0.95);
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
        // obtain the elapsed time between frames
        const deltaT = this._clock.getDelta();
        for(let index = 0; index < this._gameEntities.length; index++) {
            const element = this._gameEntities[index];
            element.update(deltaT);
        }
        this._renderer.render(this._scene, this._camera);
    }

    /**
     * get camera
     */
    public get camera(): PerspectiveCamera {
        return this._camera;
    }

    /**
     * get gameEntities
     */
    public get gameEntities(): GameEntity[] {
        return this._gameEntities;
    }
}
