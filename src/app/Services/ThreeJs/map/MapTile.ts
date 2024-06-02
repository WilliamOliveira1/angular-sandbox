import { Mesh, MeshStandardMaterial, PlaneGeometry, TextureLoader, Vector3 } from "three";
import { GameEntity } from "../entities/GameEntity";
import { ResourceManager } from "../utils/ResourceManager";


export class MapTile extends GameEntity {
    constructor(position: Vector3) {
        super(position);
    }

    public override load = async () => {
        const tileTexture = ResourceManager.instance.getRandomGroundTexture();
        const geometry = new PlaneGeometry(1,1);
        const material = new MeshStandardMaterial({
            map: tileTexture
        });

        this._mesh = new Mesh(geometry, material);
        this._mesh.position.set(
            this._position.x,
            this._position.y,
            this._position.z
        );
    };
}