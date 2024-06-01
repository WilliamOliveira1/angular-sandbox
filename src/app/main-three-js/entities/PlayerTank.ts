import { Mesh, MeshStandardMaterial, Vector3 } from "three";
import { ResourceManager } from "../utils/ResourceManager";
import { GameEntity } from "./GameEntity";
import { GameScene } from "../scene/GameScene";

type KeyboardState = {
    LeftPressed: boolean;
    RightPressed: boolean;
    UpPressed: boolean;
    DownPressed: boolean;
}

export class PlayerTank extends GameEntity {
    private _rotation: number = 0;
    constructor(position: Vector3) {
        super(position);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    private _keyboardState: KeyboardState = {
        LeftPressed: false,
        RightPressed: false,
        UpPressed: false,
        DownPressed: false
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                this._keyboardState.UpPressed = true;
                break
            case 'ArrowDown':
                this._keyboardState.DownPressed = true;
                break;
            case 'ArrowLeft':
                this._keyboardState.LeftPressed = true;
                break;
            case 'ArrowRight':
                this._keyboardState.RightPressed = true;
                break;
            default:
                break;
        }
    }

    private handleKeyUp = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                this._keyboardState.UpPressed = false;
                break
            case 'ArrowDown':
                this._keyboardState.DownPressed = false;
                break;
            case 'ArrowLeft':
                this._keyboardState.LeftPressed = false;
                break;
            case 'ArrowRight':
                this._keyboardState.RightPressed = false;
                break;
            default:
                break;
        }
    }

    public override load = async () => {
        const tankModel = ResourceManager.instance.getModel('tank');
        if(!tankModel) {
            throw new Error('unable to get tank model');
        }

        const tankBodyMesh = tankModel.scene.children.find((m) => m.name === 'Body') as Mesh;
        const tankTurretMesh = tankModel.scene.children.find((m) => m.name === 'Turret') as Mesh;

        const tankBodyTexture = ResourceManager.instance.getTexture('tank-body');
        const tankTurretTexture = ResourceManager.instance.getTexture('tank-turret');

        if(!tankBodyMesh || !tankTurretMesh || !tankBodyTexture || !tankTurretTexture) {
            throw new Error('unable to load player model or textures');
        }

        const bodyMaterial = new MeshStandardMaterial({
            map: tankBodyTexture
        });

        const turretMaterial = new MeshStandardMaterial({
            map: tankTurretTexture
        });

        tankBodyMesh.material = bodyMaterial;
        tankTurretMesh.material = turretMaterial;

        this._mesh.add(tankBodyMesh);
        this._mesh.add(tankTurretMesh);
    };

    public override update = (deltaT: number) => {
        let computedRotation = this._rotation;
        let computedMovement = new Vector3(); //final movement for this frame
        let moveSpeed = 2; // in tiles per second

        if(this._keyboardState.LeftPressed) {
            computedRotation += Math.PI * deltaT;
        } else if(this._keyboardState.RightPressed) {
            computedRotation -= Math.PI * deltaT;
        }

        // keep computed rotation between 0 and 2PI
        const fullCircle = Math.PI * 2;
        if(computedRotation > fullCircle) {
            computedRotation = fullCircle - computedRotation;
        } else if(computedRotation < 0) {
            computedRotation = fullCircle + computedRotation;
        }

        // change the x and y movement after rotation
        const yMovement = moveSpeed * deltaT * Math.cos(computedRotation);
        const xMovement = moveSpeed * deltaT * Math.sin(computedRotation);
        if(this._keyboardState.UpPressed) {
            computedMovement = new Vector3(xMovement, -yMovement, 0);
        } else if(this._keyboardState.DownPressed) {
            computedMovement = new Vector3(-xMovement, yMovement, 0);
        }

        this._rotation = computedRotation;
        this._mesh.setRotationFromAxisAngle(new Vector3(0,0,1), computedRotation);
        //update the current position by adding the movement
        this._mesh.position.add(computedMovement);

        GameScene.instance.camera.position.set(
            this._mesh.position.x,
            this._mesh.position.y,
            GameScene.instance.camera.position.z
        );
    }
}