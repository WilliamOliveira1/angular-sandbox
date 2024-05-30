import { Vector3 } from 'three'
import { GameEntity } from '../entities/GameEntity'
import { MapTile } from './MapTile';

export class GameMap extends GameEntity {
    private _size: number;
    private _tiles: MapTile[] = [];
    constructor(position: Vector3, size: number) {
        super(position);
        this._size = size;

        for(let i:number = 0; i< this._size; i++) {
            for(let j:number = 0; j < this._size; j++) {
                this._tiles.push(new MapTile(new Vector3(i,j,0)));
            }
        }
    }

    public override load = async () => {
        for(let index: number = 0; index < this._tiles.length; index++) {
            const element = this._tiles[index];
            await element.load();
            this._mesh.add(element.mesh);
        }
    }
}