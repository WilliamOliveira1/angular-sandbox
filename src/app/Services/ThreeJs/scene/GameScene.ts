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
import { Wall } from '../map/Wall';
import { EnemyTank } from '../entities/EnemyTank';
import { getRandomUniquePositionsValues } from '../utils/MathUtils';

@Injectable({
    providedIn: 'root'
})
export class GameScene {
    private static _instance = new GameScene();    
    private _width: number = window.innerWidth;
    private _height: number = window.innerHeight;
    private _renderer: WebGLRenderer;
    private _camera: PerspectiveCamera;
    private _mapSize: number = 40; 

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
        this._renderer.setSize(this._width, this._height);
        
        this._scene = new Scene();
        this._camera = new PerspectiveCamera(70, this._width / this._height, 0.1, 1000);
        this._camera.position.set(15, 7, 10);
        window.addEventListener('resize', this.resize, false)

        // add game map
        const gameMap = new GameMap(new Vector3(0,0,0), this._mapSize);
        this._gameEntities.push(gameMap);

        // add the player tank
        const playerTank = new PlayerTank(new Vector3(15,7,0));
        this._gameEntities.push(playerTank);

        // add the enemy tank
        const positionValues = getRandomUniquePositionsValues(10, 20, 5, [15]);
        positionValues.forEach((position) => {
            let enemyTank = new EnemyTank(new Vector3(position[0],position[1],0));
            this._gameEntities.push(enemyTank);
        });
        this.createWalls();
    }            

    /**
    * Get the camera
    * @returns returns the threeJs perspective camera
    */
    public get camera(): PerspectiveCamera {
        return this._camera;
    }

    /**
    * Get game entities
    * @returns returns an array of game entities data
    */
    public get gameEntities(): GameEntity[] {
        return this._gameEntities;
    }

    /**
    * Dynamically add entities to the scene
    * @param entity GameEntity data
    */
    public addToScene = (entity: GameEntity) => {
        this._gameEntities.push(entity);
        this._scene.add(entity.mesh);
    };

    /**
    * Renders the threeJs scene
    */
    public render = (): void => {
        requestAnimationFrame(this.render);
        // remove entities no longer needed
        this.disposeEntities();
        // obtain the elapsed time between frames
        const deltaT = this._clock.getDelta();
        for(let index = 0; index < this._gameEntities.length; index++) {
            const element = this._gameEntities[index];
            element.update(deltaT);
        }
        this._renderer.render(this._scene, this._camera);
    }

    /**
    * Load the game entities into threeJs scene
    */
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

    /**
    * Load the threeJs scene into HTML canvas
    * @param targetElement DOM element
    */
    public initialize(targetElement: HTMLDivElement): void {
        if (!targetElement) {
            throw new Error("Unable to find target element");
        }

        targetElement.appendChild(this._renderer.domElement);
    }

    /**
    * Get the GameScene instance
    * @returns returns GameScene instance
    */
    public static get instance() {
        return this._instance;
    }
    
    private createWalls = () => {
        const edge = this._mapSize - 1;
        
        this._gameEntities.push(new Wall(new Vector3(0,0,0)));
        this._gameEntities.push(new Wall(new Vector3(edge,0,0)));
        this._gameEntities.push(new Wall(new Vector3(edge,edge,0)));
        this._gameEntities.push(new Wall(new Vector3(0,edge,0)));

        for(let index: number = 1; index < edge; index++) {
            this._gameEntities.push(new Wall(new Vector3(index,0,0)));
            this._gameEntities.push(new Wall(new Vector3(0,index,0)));
            this._gameEntities.push(new Wall(new Vector3(edge,index,0)));
            this._gameEntities.push(new Wall(new Vector3(index,edge,0)));
        }
    }

    private disposeEntities = () => {
        const entitiesToBeDisposed = this._gameEntities.filter(
            (e) => e.shouldDispose
        );

        entitiesToBeDisposed.forEach((element) => {
            this._scene.remove(element.mesh);
            element.dispose();
        });

        this._gameEntities = [
            ...this._gameEntities.filter((e) => !e.shouldDispose)
        ];
    }

    private resize = () => {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._renderer.setSize(this._width, this._height);
        this._camera.aspect = this._width / this._height;
        this._camera.updateProjectionMatrix();
    };
}
