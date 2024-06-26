import { 
    Box3, 
    Material, 
    Mesh, 
    MeshPhongMaterial, 
    Sphere, 
    SphereGeometry, 
    Vector3 
} from "three";
import { GameEntity } from "./GameEntity";
import { GameScene } from "../scene/GameScene";
import { ExplosionEffect } from "../effects/ExplosionEffects";
import { EnemyTank } from "./EnemyTank";


export class Bullet extends GameEntity {
    private _angle: number;

    constructor(position: Vector3, angle: number) {
        super(position);
        this._angle = angle;
    }

    public override load = async () => {
        const bulletGeometry = new SphereGeometry(0.085);
        const bulletMaterial = new MeshPhongMaterial({color: 0x262626});

        this._mesh = new Mesh(bulletGeometry, bulletMaterial);
        this._mesh.position.set(
            this._position.x,
            this._position.y,
            this._position.z
        );
        this._collider = new Box3()
            .setFromObject(this._mesh)
            .getBoundingSphere(new Sphere(this._mesh.position));
    }

    public override update = (deltaT: number) => {
        const travelSpeed = 8;
        const computedMovement = new Vector3(
            travelSpeed * Math.sin(this._angle) * deltaT,
            -travelSpeed * Math.cos(this._angle) * deltaT,
            0
        );

        this._mesh.position.add(computedMovement);

        const collider = GameScene.instance.gameEntities.filter(
            (c) =>
                c.collider &&
                c !== this &&
                c.entityType !== 'player' &&
                c.collider.intersectsSphere(this._collider as Sphere)
        );

        if(collider.length) {
            this._shouldDispose = true;
            const explosion = new ExplosionEffect(this._mesh.position, 1);
            explosion.load().then(() => {
                GameScene.instance.addToScene(explosion);
            });

            const enemies = collider.filter((c) => c.entityType === 'enemy');
            if(enemies.length) {
                (enemies[0] as EnemyTank).damage(20);
            }
        }
    }

    public override dispose = () => {
        (this._mesh.material as Material).dispose();
        this._mesh.geometry.dispose();
    };
}