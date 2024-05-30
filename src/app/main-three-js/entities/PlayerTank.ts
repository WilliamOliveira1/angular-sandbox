import { Mesh, MeshStandardMaterial, Vector3 } from "three";
import { ResourceManager } from "../utils/ResourceManager";
import { GameEntity } from "./GameEntity";



export class PlayerTank extends GameEntity {
    constructor(position: Vector3) {
        super(position);
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
}